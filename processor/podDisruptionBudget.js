const selector = require('./selector')

module.exports = {
  process: (manifests, manifest, relationships) => {
    const applicable = manifests.filter(m => ['Pod', 'Deployment', 'StatefulSet'].indexOf(m.kind) > -1)
    const matchLabels = manifest.spec.selector.matchLabels
    const related = selector.selectByLabels(applicable, matchLabels)
    related.forEach(r => {
      relationships.push({
        from: {
          kind: manifest.kind,
          name: manifest.metadata.name
        },
        predicate: 'govern',
        to: {
          kind: r.kind,
          name: r.metadata.name
        }
      })
    })
  }
  
}