const selector = require('./selector')

module.exports = {
  process: (manifests, manifest, relationships) => {
    const applicable = manifests.filter(m => ['Pod', 'Deployment', 'StatefulSet'].indexOf(m.kind) > -1)
    const matchLabels = manifest.spec.selector
    const related = selector.selectByLabels(applicable, matchLabels)
    if (manifest.spec.ports){
      manifest.spec.ports.forEach(port => {
        var container = selector.selectByPort(related,port)
        if (container){
          const rel = {
            to: {
              kind: manifest.kind,
              adornments: [`${port.name||''} ${port.port||''} ${port.nodePort||''}`],
              name: manifest.metadata.name
            },
            predicate: 'expose',
            from: {
              kind: container.kind,
              adornments: [`${container.port.name||''} ${port.targetPort||''}`],
              name: container.metadata.name
            }
          }
          relationships.push(rel)
        }
      });
    }
  }
}
