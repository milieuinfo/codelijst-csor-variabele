'use strict';
import yaml from 'js-yaml';
import fs, {readFileSync} from "fs";
import {metadataOptions, shapes_dcat, dcat_rules, frame_catalog} from "@milieuinfo/maven-metadata-generator-npm/src/utils/variables.js";


const config = yaml.load(fs.readFileSync('./source/config.yml', 'utf8'));

const virtuoso = config.deploy.virtuoso;

const dcat_dataset_jsonld = '../temp/' + config.dcat.path_dataset + metadataOptions.artifactId + '/' + config.dcat.dataset_jsonld

const dcat_dataset_turtle = '../temp/' + config.dcat.path_dataset + metadataOptions.artifactId + '/' + config.dcat.dataset_turtle

const dcat_catalog_jsonld = '../temp/' + config.dcat.path_catalog + metadataOptions.artifactId + '/' + config.dcat.catalog_jsonld

const dcat_catalog_turtle = '../temp/' + config.dcat.path_catalog + metadataOptions.artifactId + '/' + config.dcat.catalog_turtle

const datasetOptions = {
    "turtlePath": dcat_dataset_turtle,
    "jsonldOptions": {"file": dcat_dataset_jsonld, "frame": frame_catalog}
}

const catalogOptions = {
    "turtlePath": dcat_catalog_turtle,
    "jsonldOptions": {"file": dcat_catalog_jsonld, "frame": frame_catalog}
}

const metadataSource = {
    "shapesDataset": shapes_dcat,
    "rules": dcat_rules,
    "prefixes": config.prefixes
}

export {
    config,
    virtuoso,
    metadataSource,
    metadataOptions,
    datasetOptions,
    catalogOptions
};
