#!/bin/bash

# Run a sample query on the dataset
curl -s -H 'Content-Type: application/json' -XGET 'localhost:9200/a/_search?pretty' -d'
{
  "query": {
    "bool": {
      "must": [
        { "term": { "objects.class": "backpack" } },
        { "term": { "objects.class": "potted_plant" } }
      ]
    }
  }
}
'
