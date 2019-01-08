const jsonQuery = require('json-query')

module.exports = {
  selectByLabels: (manifests, matchLabels) => {
    // copy array
    let results = manifests.slice(0)
    const keys = Object.keys(matchLabels)

    return results.filter(m => {
      let match = true
      keys.forEach(k => {
        match = match && (m.metadata.labels[k] !== undefined && m.metadata.labels[k] === matchLabels[k])
      });
      return match
    })
  },

  selectByVolume: (manifests, artifactKind, artifactName) => {
    // copy array
    let results = manifests.slice(0)
    artifactKind = artifactKind[0].toLowerCase() + artifactKind.slice(1)
    return results.filter(m => {
      let match = false
      if (m.spec.template.spec.volumes) {
        m.spec.template.spec.volumes.forEach(v => {
          if (v[artifactKind] && v[artifactKind].name === artifactName) {
            match = true
          }
        })
      }
      return match
    })
  },

  selectByName: (manifests, artifactKind, artifactName) => {
    // copy array
    let results = manifests.slice(0)
    artifactKind = artifactKind[0].toUpperCase() + artifactKind.slice(1)
    return results.filter(m => m.kind == artifactKind && m.metadata.name === artifactName)
  }
}