#!/bin/bash

# Run a sample query on the dataset
curl -s -H 'Content-Type: application/json' -XGET 'localhost:9200/dexter/_search?pretty' -d'
{
  "query": {
    "bool": {
      "must": [
        { "match": { "objects.class": "truck" } },
        { "match": { "objects.class": "person" } }
      ]
    }
  }
}
'
