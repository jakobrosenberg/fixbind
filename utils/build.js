const { execSync } = require('child_process')
const { rebuild } = require('electron-rebuild')

module.exports.buildFromNode = {
    msg: 'build bindings in Node',
    fn: (package, options, ctx) => {
        if (options.runtime !== 'electron')
            throw 'Can\'t build bindings. Not in Electron environment'

        rebuild({
            buildPath: package.projectPath,
            electronVersion: process.versions.electron,
        })
    }
}

module.exports.buildFromTerminal = {
    msg: 'build bindings in terminal',
    fn: (package, options, ctx) => {
        if (options.runtime !== 'electron')
            throw 'Can\'t build bindings. Not in Electron environment'
        
        execSync(`npx electron-rebuild -v ${process.versions.electron}`, { cwd: package.projectPath })
    }
}