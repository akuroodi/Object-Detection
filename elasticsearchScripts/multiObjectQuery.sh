#!/bin/bash

# Run a query to get frames with a knife, a bed, and a handbag
curl -s -H 'Content-Type: application/json' -XGET 'localhost:9200/e/_search?pretty' -d'
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
