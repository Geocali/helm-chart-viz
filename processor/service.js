const portMatcher = require('./portMatcher')
const selector = require('./selector')

module.exports = {
  process: (manifests, manifest, relationships) => {
    const applicable = manifests.filter(m => ['Pod', 'Deployment', 'StatefulSet'].indexOf(m.kind) > -1)
    const matchLabels = manifest.spec.selector
    const related = selector.selectByLabels(applicable, matchLabels)
    related.forEach(r => {
      const rel = {
        to: {
          kind: manifest.kind,
          name: manifest.metadata.name
        },
        predicate: 'deploy',
        from: {
          kind: r.kind,
          name: r.metadata.name
        }
      }
      
      ports = portMatcher.match(manifest, r)
      if (ports.length > 0) {
        rel.to.adornments = ports.map(p => p.svcPort)
        rel.from.adornments = ports.map(p => p.podPort)
      }

      relationships.push(rel)
    })
  }
  
}
