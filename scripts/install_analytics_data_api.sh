#!/usr/bin/env bash

git clone https://github.com/edx/edx-analytics-data-api.git
cd edx-analytics-data-api
git checkout dan-f/add-es-management-commands
pip install -q -r requirements/base.txt
make test.install_elasticsearch
cd -
