const { rmSync } = require('fs')
const { resolve } = require('path')

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