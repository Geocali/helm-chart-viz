
module.exports = {
  match: (svc, pod) => {
    const containers = pod.spec.template.spec.containers || pod.spec.containers
    const results = []
    if (svc.spec.ports && containers) {
      svc.spec.ports.forEach(p1 => {
        p1Int = parseInt(p1.targetPort || p1.port)
        containers.forEach(c => {
          if (c.ports) {
            c.ports.forEach(p2 => {
              p2Int = parseInt(p2.containerPort)
              if (p1Int === p2Int) {
                p1Str = p1.name + ' ' + (p1.targetPort ? p1.port + ':' + p1.targetPort : p1.port)
                p2Str = p2.name + ' ' + p2.containerPort
                results.push({
                  svcPort: p1Str,
                  podPort: p2Str
                })
              }
            })
          }
        })
      })
    }
    return results
  }
}