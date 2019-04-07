const spawn = require('child_process').spawnSync
const path = require('path')
const fs = require('fs')

module.exports = {
  render: (output,puml) => {
    console.log('Rendering...')

    const pumlFile = output + '.puml'
    fs.writeFileSync(pumlFile, puml)
  }
}