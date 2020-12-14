#!/bin/bash

# Run a query to get frames with only 2 cars
curl -s -H 'Content-Type: application/json' -XGET 'localhost:9200/a/_search?pretty' -d'
{
  "_source": ["frame", "objectCounts"],
  "query": {
    "bool": {
      "must": {
        "range" : {
          "objectCounts.person" : { "gte" : 9 }
        }
      }
    }
  }
}
'
