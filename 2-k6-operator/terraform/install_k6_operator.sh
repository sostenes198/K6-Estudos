#! /bin/bash
git clone https://github.com/grafana/k6-operator.git
cd k6-operator
make deploy
rm -rf k6-operator