const YAML = require('yamljs')

module.exports = {
  parse: (manifestYaml) => {
    console.log('Parsing manifests...')
    
    let manifests = manifestYaml.split('---').map(y => YAML.parse(y))

    // First element is null due to leading delimiter in file.
    if (manifests.length > 0 && !manifests[0]) {
      manifests = manifests.slice(1)
    }

    return manifests
  }
}