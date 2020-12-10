#!/bin/bash

# Create and index the documents using the default standard analyzer

'
{
   "mappings": {
      "doc": {
         "properties": {
            "parent": {
               "type": "nested",
               "properties": {
                  "label": {
                     "type": "string"
                  },
                  "name": {
                     "type": "string"
                  }
               }
            }
         }
      }
   }
}
'


curl -s -H "Content-Type: application/x-ndjson" -XPOST 'localhost:9200/dexter/frame/_bulk?pretty' --data-binary @../elasticsearchInput/elasticsearch_bulk_input.txt
