#!/bin/bash

# Create index for video A
curl -s -H "Content-Type: application/x-ndjson" -XPOST 'localhost:9200/a/frame/_bulk?pretty' --data-binary @../elasticsearchInput/elasticsearch_bulk_a.txt

# Create index for video B
curl -s -H "Content-Type: application/x-ndjson" -XPOST 'localhost:9200/b/frame/_bulk?pretty' --data-binary @../elasticsearchInput/elasticsearch_bulk_b.txt

# Create index for video C
curl -s -H "Content-Type: application/x-ndjson" -XPOST 'localhost:9200/c/frame/_bulk?pretty' --data-binary @../elasticsearchInput/elasticsearch_bulk_c.txt

# Create index for video D
curl -s -H "Content-Type: application/x-ndjson" -XPOST 'localhost:9200/d/frame/_bulk?pretty' --data-binary @../elasticsearchInput/elasticsearch_bulk_d.txt
