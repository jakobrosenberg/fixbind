const { resolve } = require('path')
const rmSync = require('fs').rmSync || require('fs-extra').removeSync

if (!rmSync)
    throw new Error('Installed version of Node does not support rmSync. Please install fs-extra.')

const removeBindings = (package, { log }) => {
    try {
        log.log('remove old bindings...')
        const bindingsPath = resolve(package.projectPath, 'node_modules/@serialport/bindings/build')
        rmSync(bindingsPath, { force: true, recursive: true })
    } catch (err) {
        log.log('remove old bindings... failed, reason:', err)
    }
}

module.exports = { removeBindings }