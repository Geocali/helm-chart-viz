const spawn = require('child_process').spawnSync

module.exports = {
  load: (releaseName) => {
    console.log('Loading manifest from helm...')

    const helm = spawn('helm', ['get', 'manifest', releaseName])
    if (helm.status != 0) {
      console.log('Failed.')
      console.error(helm.stderr.toString())
      process.exit(1)
    }

    return helm.stdout.toString()
  }
}