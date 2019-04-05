const YAML = require('yamljs')

module.exports = {
  parse: (manifestYaml) => {
    console.log('Parsing manifests...')
    
    let manifests = manifestYaml.split(/^---$/gm).map(y => YAML.parse(y)).filter(y=>y)
    
    return manifests
  }
}
