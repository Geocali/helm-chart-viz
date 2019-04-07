#!/usr/bin/env node
const parser = require('./parser')
const processor = require('./processor')
const translator = require('./translator')
const renderer = require('./renderer')


var stdIn = process.openStdin()
var manifestYaml = ''

stdIn.on('data',d=>{
  manifestYaml += d
})

stdIn.on('end',()=>{
  const manifests = parser.parse(manifestYaml)
  const appName = processor.getAppName(manifests)
  const data = processor.process(manifests)
  const puml = translator.translate(appName, data)
  renderer.render(appName,puml)
})

