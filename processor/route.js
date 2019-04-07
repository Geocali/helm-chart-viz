
module.exports = {
  process: (manifests, manifest, relationships) => {
    if (manifest.spec.to){
      relationships.push({
        to:{
          kind: manifest.kind,
          adornments: ['url: '+manifest.spec.host,manifest.spec.tls.termination].filter(x=>x) ,
          name: manifest.metadata.name
        },
        predicate: 'publish',
        from:{
          kind: 'Service',
          name: manifest.spec.to.name
        }
      })
    }
  }
  
}