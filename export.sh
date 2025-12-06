#!/bin/bash

mkdir -p tmp

# Tables to export
sqlite3 -header -csv backend/db/data.sqlite "SELECT * FROM queue_log;" > tmp/queue.csv

tar -zvcf exports/queue_data.tar.gz tmp
