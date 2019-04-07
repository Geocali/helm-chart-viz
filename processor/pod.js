
module.exports = {
  process: (manifests, manifest, relationships,o) => {
    const volumes = manifest.spec.volumes || manifest.spec.template.spec.volumes
    const containers = manifest.spec.containers || manifest.spec.template.spec.containers || []
    containers.forEach(c=>{
      o.containers.push({
        name:c.name,
        image:c.image
      })
    })
  }  
}