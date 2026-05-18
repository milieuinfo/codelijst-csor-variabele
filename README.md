# Codelijst CSOR Variabele

Codelijst van variabelen voor het **Chemische Stoffen en Omgevingsparameters-Register (CSOR)** van de Vlaamse overheid, Departement Omgeving.

## Beschrijving

Een variabele is een kenmerk dat geobserveerd kan worden, los van de context waarin de observatie gebeurt, hoe de observatie gebeurt of hoe de waarde van de observatie wordt vastgelegd.

Deze codelijst bevat **1691 variabelen** gepubliceerd als [SKOS](https://www.w3.org/TR/skos-reference/) concept scheme via Linked Data.

- Concept scheme URI: `https://data.omgeving.vlaanderen.be/id/conceptscheme/csor/variabele`
- CSOR namespace: `https://data.omgeving.vlaanderen.be/ns/csor#`

## Bestandsformaten

De codelijst is beschikbaar in meerdere RDF-serialisatieformaten:

| Bestand | Formaat |
|---|---|
| `variabelen.ttl` | Turtle |
| `variabelen.jsonld` | JSON-LD |
| `variabelen.nt` | N-Triples |
| `variabelen.rj` | RDF/JSON |
| `variabelen_report.ttl` | SHACL validatierapport |

De bestanden staan in:
```
src/main/resources/be/vlaanderen/omgeving/data/id/conceptscheme/csor/variabele/
```

## Datamodel

Elke variabele is een `csor:Variabele` en een `skos:Concept` met volgende eigenschappen:

| Eigenschap | Beschrijving |
|---|---|
| `skos:prefLabel` | Nederlandse naam van de variabele |
| `skos:notation` | Symbool / afkorting |
| `csor:symbool` | Symbool |
| `csor:inchikey` | InChIKey (voor chemische stoffen) |
| `owl:deprecated` | Of de variabele verouderd is |

### Gebruikte vocabularia

- [SKOS](https://www.w3.org/TR/skos-reference/) — Simple Knowledge Organization System
- [OWL](https://www.w3.org/OWL/) — Web Ontology Language
- [QUDT](http://qudt.org/) — Quantities, Units, Dimensions and Types
- [I-ADOPT](https://w3id.org/iadopt/ont/) — Variable representation
- [SHACL](https://www.w3.org/TR/shacl/) — Shapes Constraint Language (validatie)

## Licentie

[GNU General Public License v3.0](LICENSE)
