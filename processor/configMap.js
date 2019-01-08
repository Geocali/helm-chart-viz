const selector = require('./selector')

module.exports = {
  process: (manifests, manifest, relationships) => {
    const applicable = manifests.filter(m => ['Pod', 'Deployment', 'StatefulSet'].indexOf(m.kind) > -1)
    const related = selector.selectByVolume(applicable, manifest.kind, manifest.metadata.name)
    related.forEach(r => {
      relationships.push({
        to: {
          kind: manifest.kind,
          name: manifest.metadata.name
        },
        predicate: 'configured by',
        from: {
          kind: r.kind,
          name: r.metadata.name
        }
      })
    })
  }
  
}