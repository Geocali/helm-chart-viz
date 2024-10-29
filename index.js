#!/usr/bin/env node
const parser = require('./parser')
const processor = require('./processor')
const translator = require('./translator')
const renderer = require('./renderer')
const fs = require('fs');

function processManifest() {
  const manifests = parser.parse(manifestYaml);
  const appName = processor.getAppName(manifests);
  const data = processor.process(manifests);
  const puml = translator.translate(appName, data);
  renderer.render(appName, puml);
}

const debug = false;

if (debug) {
  const filePath = 'helm-chart-viz/test.yaml'; // Replace with the actual file path

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    manifestYaml = data;
    processManifest();
  });
}
else {
  var stdIn = process.openStdin()
  var manifestYaml = ''
  stdIn.on('data',d=>{
    manifestYaml += d
  })
  
  stdIn.on('end',()=>processManifest())
}
