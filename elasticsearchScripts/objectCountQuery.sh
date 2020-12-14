#!/bin/bash

# Run a query to get frames with more than 9 people
curl -s -H 'Content-Type: application/json' -XGET 'localhost:9200/a/_search?pretty' -d'
{
  "query": {
    "script_score" : {
      "query": {
        "bool": {
          "must": {
            "range" : {
              "objectCounts.person" : { "gte" : 9 }
            }
          }
        }
      },
      "script" : {
        "lang": "painless",
        "source": "double total = 0; double count = 0.0; for (item in params._source.objects) { if (item.class == \"person\") { total += item.confidence; count += 1.0 }} return total / count;"
      }
    }
  }
}
'
