#!/bin/bash

mkdir -p data

library_json="https://data.austintexas.gov/api/views/tc36-hn4j/rows.json?accessType=DOWNLOAD"

curl $library_json > data/library.json
