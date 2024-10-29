const path = require('path')
module.exports = {
  translate: (releaseName, data) => {
    console.log('Translating to PlantUML...')

    const objectTypeMap = {
      PersistentVolumeClaim: 'database',
      Namespace: 'frame',
      ConfigMap: 'cloud',
      Secret: 'cloud',
      Service: 'interface',
      Route: 'interface',
      Ingress: 'interface'
    }
    const objectColorMap = {
      PersistentVolumeClaim: '#Yellow',
      ConfigMap: '#AquaMarine',
      Service: '#DeepSkyBlue',
      Secret: '#Tomato',
      Route: '#Green',
      Ingress: '#Green'
    }
    let puml = `
@startuml ${releaseName}
skinparam folderFontSize 24
skinparam frameFontSize 16
skinparam Padding 10
skinparam FontName Ebrima
skinparam FontSize 9

package ${releaseName} {
`

    data.objects.forEach(o => {
      if (o.kind==='Deployment'){
        puml += `
        frame "<<${o.kind}>> ${o.name}" as ${o.kind}_${slug(o.name)} {`

        o.containers.forEach(c=>{
          puml += `
          [<<Container>> ${c.name} \\n${replaceBrackets(c.image)}] as Container_${slug(c.name)}`
        })

        puml +=`
        }
        `
      } else {
        puml += `
        ${objectTypeMap[o.kind]||'component'} ${o.kind}_${slug(o.name)} ${objectColorMap[o.kind]||''} [
          <<${o.kind}>>
          ${o.name} ${o.notes}
        ]
        `
      }
    })
    puml += '\n'

    data.relationships.forEach(r => {
      puml += `
  ${r.from.kind}_${slug(r.from.name)} `
      if (r.from.adornments) {
        puml += '"' + r.from.adornments.join('\\n') + '" '
      }
      puml += '..> '
      if (r.to.adornments) {
        puml += '"' + r.to.adornments.join('\\n') + '" '
      }
      puml += `${r.to.kind}_${slug(r.to.name)} : ${r.predicate}`
    })

    puml += `
}


@enduml`

    return puml
  }
}

function slug(str){
  if (str === undefined || str === null){
    return str
  }
  return str.replace(/-/g,'_')
}
function replaceBrackets(str){
  return str.replace(/[\[\]]/g,'*')
}