const loader = require('./loader')
const parser = require('./parser')
const processor = require('./processor')
const translator = require('./translator')
const renderer = require('./renderer')

if (process.argv.length < 4) {
  console.log('Usage: node index.js <helm_release_name> <output_dir>')
  process.exit(1)
}

const releaseName = process.argv[2]
const manifestYaml = loader.load(releaseName)
const manifests = parser.parse(manifestYaml)
const data = processor.process(manifests)
const puml = translator.translate(releaseName, data)
renderer.render(releaseName, puml)
