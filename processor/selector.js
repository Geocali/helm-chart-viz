const jsonQuery = require('json-query')

module.exports = {
  selectByLabels: (manifests, matchLabels) => {
    // copy array
    let results = manifests.slice(0)
    // if matchLabels is empty, there is no selector: return an empty list
    if (matchLabels === undefined || matchLabels === null) {
      return results.filter(m => false)
    }
    
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
    artifactKind = camelCase(artifactKind)
    var matches = []
    manifests.forEach(m => {
      if (m.spec&&m.spec.template&&m.spec.template.spec&&m.spec.template.spec.volumes) {
        m.spec.template.spec.volumes.forEach(v => {
          if (v[artifactKind] && 
            (v[artifactKind].claimName === artifactName||
              v[artifactKind].name === artifactName)) {
            m.spec.template.spec.containers.forEach(c=>{
              if (c.volumeMounts){
                c.volumeMounts.forEach(vm=>{
                  if (vm.name===v.name){
                    matches.push({
                      kind: 'Container',
                      metadata:{
                        name: c.name
                      }
                    })        
                  }
                })
              }
            })
          }
        })
      }
    })
    return matches
  },

  selectByEnv: (manifests, artifactKind, artifactName) => {
    artifactKind = camelCase(artifactKind)
    var matches = []
    manifests.forEach(m=>{
      if (m.spec&&
        m.spec.template&&
        m.spec.template.spec&&
        m.spec.template.spec.containers) {
        m.spec.template.spec.containers.forEach(c => {
          if (c.env){
            c.env.some(e=>{
              if (e.valueFrom&&
                e.valueFrom.secretKeyRef&&
                e.valueFrom.secretKeyRef.name===artifactName){
                matches.push({
                  kind: 'Container',
                  metadata:{
                    name: c.name
                  }
                })
                return true
              }
            })
          }
        })
      }      
    })
    return matches
  },

  selectByPort: (manifests,port)=>{
    var match
    manifests.forEach(m=>{
      if (m.spec&&
        m.spec.template&&
        m.spec.template.spec&&
        m.spec.template.spec.containers) {
        m.spec.template.spec.containers.forEach(c => {
          if (c.ports){
            c.ports.some(p=>{
              if (p.name===port.name||
                p.containerPort===port.targetPort){
                match = {
                  kind: 'Container',
                  metadata:{
                    name: c.name
                  },
                  port: p
                }
              }
            })
          }
        })
      }      
    })
    return match
  },


  selectByName: (manifests, artifactKind, artifactName) => {
    // copy array
    let results = manifests.slice(0)
    artifactKind = artifactKind[0].toUpperCase() + artifactKind.slice(1)
    return results.filter(m => m.kind == artifactKind && m.metadata.name === artifactName)
  }

}

function camelCase(str){
  return str.substr(0,1).toLowerCase() + str.slice(1)  
}