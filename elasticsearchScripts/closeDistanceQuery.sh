#!/bin/bash

# Run a query to find frames where a person is closet to a car
curl -s -H 'Content-Type: application/json' -XGET 'localhost:9200/specific/_search?pretty' -d'
{
  "query": {
    "script_score" : {
      "query" : {
        "bool": {
          "must": [
            { "term" : { "objects.class" : "fire_hydrant" } },
            { "term" : { "objects.class" : "car" } }
          ]
        }
      },
      "script" : {
        "lang": "painless",
        "source": "double minDistance = 1000000000.0; for (int i = 0; i < params._source.objects.length; i++) { if (params._source.objects[i][\"class\"] == \"fire_hydrant\") { for (int j = 0; j < params._source.objects.length; j++) { if (i != j && params._source.objects[j][\"class\"] == \"car\") { double currDistance = Math.sqrt(Math.pow(params._source.objects[i][\"x\"] - params._source.objects[j][\"x\"], 2) + Math.pow(params._source.objects[i][\"y\"] - params._source.objects[j][\"y\"], 2)); minDistance = Math.min(minDistance, currDistance); } } } } return minDistance;"
      }
    }
  },
  "sort": [
    { "_score": { "order": "asc" } }
  ]
}
'
