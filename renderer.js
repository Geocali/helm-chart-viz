const spawn = require('child_process').spawnSync
const path = require('path')
const fs = require('fs')

module.exports = {
  render: (releaseName, puml) => {
    console.log('Rendering...')

    const outputDir = path.resolve(process.argv[3])
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    const pumlFile = path.join(outputDir, releaseName + '.puml')
    fs.writeFileSync(pumlFile, puml)

    const jarPath = path.join(__dirname, 'plantuml.jar')
    const args = [
      '-jar',
      jarPath,
      '-o',
      outputDir,
      pumlFile
    ]
    const proc = spawn('java', args)
    if (proc.status != 0) {
      console.log('Failed.')
      console.error(proc.stderr.toString())
    } else {
      console.log('Success.')
    }
  }
}