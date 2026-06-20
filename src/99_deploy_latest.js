import { config, metadataOptions } from './utils/variables.js';
import { set_env } from './utils/setenv.js';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { RoxiReasoner } from 'roxi-js';
import fetch, { fileFromSync } from 'node-fetch';

const { artifactId, groupId } = metadataOptions;
const graph = 'https://' + groupId.split('.id')[0].split('.').reverse().join('.') + '/id/graph/' + artifactId;
const omgeving = 'pr';

set_env(omgeving);

async function merge() {
    console.log('Merge turtle files to one n-triple file');
    const reasoner = RoxiReasoner.new();
    const temp_dir = path.join(process.cwd(), '/../temp');
    const nt_file = path.join(temp_dir, artifactId + '.nt');

    const ttl_src = await glob('./main/resources/be/vlaanderen/omgeving/data/id/**/*.ttl', { cwd: process.cwd() });
    const ttl_temp = await glob('**/*.ttl', { cwd: temp_dir });

    ttl_src.forEach(file => reasoner.add_abox(fs.readFileSync(path.join(process.cwd(), file), 'utf8').toString()));
    ttl_temp.forEach(file => reasoner.add_abox(fs.readFileSync(path.join(temp_dir, file), 'utf8').toString()));

    const sortLines = str => Array.from(new Set(str.split(/\r?\n/))).sort().join('\n');
    fs.writeFileSync(nt_file, sortLines(reasoner.get_abox_dump()), 'utf8');
    console.log('Written ' + nt_file);
    await put(nt_file);
}

async function put(nt_file) {
    const base_url = 'http://' + config.deploy.virtuoso + '-' + omgeving + '-1.vm.cumuli.be:8080';
    const auth = 'Basic ' + btoa(process.env.virtuoso_rw_username + ':' + process.env.virtuoso_rw_password);

    const response_drop = await fetch(base_url + '/sparql-auth?default-graph-uri=&query=drop+silent+graph+<' + graph + '>', {
        method: 'GET',
        headers: { 'Authorization': auth }
    });
    if (response_drop.status === 200) {
        console.log('Dropped ' + graph);
    } else {
        console.log('Failed Drop');
    }
    console.log('Status: ' + response_drop.status);
    console.log('statusText: ' + response_drop.statusText);

    console.log('Put n-triple file to named graph ' + graph);
    const response = await fetch(base_url + '/sparql-graph-crud-auth?graph-uri=' + graph, {
        method: 'PUT',
        headers: { 'Authorization': auth },
        body: fileFromSync(nt_file)
    });
    if (response.status === 200) {
        console.log('Success!');
        console.log('Put ' + nt_file + ' to ' + response.url);
    }
    console.log('Status: ' + response.status);
    console.log('statusText: ' + response.statusText);
}

merge();
