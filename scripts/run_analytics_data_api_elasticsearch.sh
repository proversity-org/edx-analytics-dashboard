#!/usr/bin/env bash

cd edx-analytics-data-api
make test.run_elasticsearch
# This is unfortunate, but recommended by Travis in order to make sure
# ElasticSearch is running by the time the Analytics Data API accesses
# it during testing.
sleep 10
# Create the ElasticSearch indicies and mappings.
export ELASTICSEARCH_LEARNERS_HOST='http://localhost:9200'
export ELASTICSEARCH_LEARNERS_INDEX='learner'
export ELASTICSEARCH_LEARNERS_UPDATE_INDEX='index_update'
./manage.py create_elasticsearch_learners_indices
cd -
