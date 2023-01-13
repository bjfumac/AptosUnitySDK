#! /usr/bin/env bash
puer build
sed -i "" 's/require("url")/require("node:url")/g' node_modules/follow-redirects/index.js
sed -i "" 's/require("http")/require("node:http")/g' node_modules/follow-redirects/index.js
sed -i "" 's/require("https")/require("node:https")/g' node_modules/follow-redirects/index.js
sed -i "" 's/require("stream")/require("node:stream")/g' node_modules/follow-redirects/index.js
sed -i "" 's/require("assert")/require("node:assert")/g' node_modules/follow-redirects/index.js
