
module.exports = {
  translate: (releaseName, data) => {
    console.log('Translating to PlantUML...')

    let puml = `
@startuml
    
package ${releaseName} {
`

    data.objects.forEach(o => {
      puml += `\t[${o.name} \\n<<${o.kind}>>]\n`
    })
    puml += '\n'

    data.relationships.forEach(r => {
      puml += `\t[${r.from.name} \\n<<${r.from.kind}>>] `
      if (r.from.adornments) {
        puml += '"' + r.from.adornments.join('\\n') + '" '
      }
      puml += '..> '
      if (r.to.adornments) {
        puml += '"' + r.to.adornments.join('\\n') + '" '
      }
      puml += `[${r.to.name} \\n<<${r.to.kind}>>] : ${r.predicate}\n`
    })

    puml += `
}

@enduml`

    return puml
  }
}