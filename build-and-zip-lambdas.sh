# build layers
#!/bin/bash

export base_dir=$(git rev-parse --show-toplevel)
export distFolder=${base_dir}/lambdas/dist

mkdir -p ${distFolder}

#zip the layers
mkdir -p layers/nodejs
cp package.json layers/nodejs
cp package-lock.json layers/nodejs
cd ${base_dir}/layers/nodejs
npm install
cd ..
zip -r ${distFolder}/layer.zip nodejs/*

# switch to lambdas directory
cd ${base_dir}/lambda/src

#zip public-cache
zip -r ${distFolder}/food-rating.zip ./* -x */tests/* 