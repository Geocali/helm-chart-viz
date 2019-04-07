const pdb = require('./podDisruptionBudget')
const svc = require('./service')
const configMap = require('./configMap')
const ingress = require('./ingress')
const pod = require('./pod')
const pvc = require('./pvc')
const route = require('./route')

module.exports = {
  process: (manifests) => {
    console.log('Processing...')
    
    const relationships = []
    const objects = []
    manifests.forEach(m => {

      var o = {
        kind: m.kind,
        name: m.metadata.name,
        notes: '',
        containers: []
      }

      switch(m.kind) {
        case 'PodDisruptionBudget':
        pdb.process(manifests, m, relationships)
        break;

        case 'ConfigMap':
        case 'Secret':
        configMap.process(manifests, m, relationships)
        break;

        case 'Service':
        svc.process(manifests, m, relationships)
        break;

        case 'PersistentVolumeClaim':
        pvc.process(manifests, m, relationships,o)
        break;

        case 'Ingress':
        ingress.process(manifests, m, relationships)
        break;

        case 'Route':
        route.process(manifests, m, relationships)
        break;

        case 'Deployment':
        case 'StatefulSet':
        case 'Pod':
        pod.process(manifests, m, relationships,o)
        break;
      }
      objects.push(o)
    })

    return {
      objects: objects,
      relationships: relationships
    }
  },

  getAppName: manifests =>{
    var appName = 'app'
    manifests.some(m => {
      if (m.metadata && m.metadata.labels && m.metadata.labels.app) {
        appName = m.metadata.labels.app;
        return true
      }
      if (m.kind === 'Namespace' && m.metadata && m.metadata.name) {
        appName = m.metadata.name;
        return true
      }
    });
    return appName
  }  
}


