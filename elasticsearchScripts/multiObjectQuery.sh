#!/bin/bash

# Run a query to get frames with only 2 cars
curl -s -H 'Content-Type: application/json' -XGET 'localhost:9200/specific/_search?pretty' -d'
{
  "query": {
    "script_score" : {
      "query" : {
        "bool": {
          "must": [
            { "term" : { "objects.class" : "knife" } },
            { "term" : { "objects.class" : "bed" } },
            { "term" : { "objects.class" : "handbag" } }
          ]
        }
      },
      "script" : {
        "lang": "painless",
        "source": "double total = 0; for (item in params._source.objects) { if (item.class == \"knife\" || item.class == \"bed\" || item.class == \"handbag\") { total += item.confidence }} return total;"
      }
    }
  }
}
'
