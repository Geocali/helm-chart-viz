
module.exports = {
  process: (manifests, manifest, relationships) => {
    const volumes = manifest.spec.volumes || manifest.spec.template.spec.volumes
    if (!volumes) return

    volumes.forEach(v => {
      if (v.persistentVolumeClaim) {
        relationships.push({
          from: {
            kind: manifest.kind,
            name: manifest.metadata.name
          },
          predicate: 'persist to',
          to: {
            kind: 'PersistentVolumeClaim',
            name: v.persistentVolumeClaim.claimName
          }  
        })
      }
    })
  }  
}