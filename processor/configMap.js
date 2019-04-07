const selector = require('./selector')

module.exports = {
  process: (manifests, manifest, relationships) => {
    var predicate = 'configured by'
    const applicable = manifests.filter(m => ['Pod', 'Deployment', 'StatefulSet'].indexOf(m.kind) > -1)
    var related = selector.selectByVolume(applicable, manifest.kind, manifest.metadata.name)
    if (related.length){
      predicate = 'mounted config'
    } else {
      related = selector.selectByEnv(applicable, manifest.kind,manifest.metadata.name)
      if (related.length){
        predicate = 'env from'
      }
    }
    related.forEach(r => {
      relationships.push({
        to: {
          kind: manifest.kind,
          name: manifest.metadata.name
        },
        predicate: predicate,
        from: {
          kind: r.kind,
          name: r.metadata.name
        }
      })
    })
  }
  
}