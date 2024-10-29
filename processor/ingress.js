
module.exports = {
  process: (manifests, manifest, relationships) => {
    if (manifest.spec.rules) {
      manifest.spec.rules.forEach(r => {
        if (!r.http.paths) return
        r.http.paths.forEach(p => {
          if (p.backend && p.backend.service && p.backend.service.name) {
            relationships.push({
              from: {
                kind: manifest.kind,
                name: manifest.metadata.name
              },
              predicate: 'serve traffic',
              to: {
                kind: 'Service',
                name: p.backend.service.name
              }
            })
          }
        })
      })
    }
  }  
}