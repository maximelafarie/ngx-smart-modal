#!/usr/bin/env bash
set -exu

# Build package core in dist folder and copy package.json, readme and license files

# Build package
npm run bundle

# copy root readme and license to deployment folder
cp README.md ./src/lib/dist
cp LICENSE ./src/lib/dist

# copy package.json files that are in lib folder
cp ./src/lib/package.json ./src/lib/dist
