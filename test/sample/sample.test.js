/**
 * Tests are work in progress and not functional
 */

const { fixbind } = require("../..");

test('can run fixbind', async () => {
    await test('can download bindings', () => {
        fixbind(require, 'serialport', { solutions: ['downloadPrebuild'] })
    })

    await test('can build bindings from terminal', () => {
        fixbind(require, 'serialport', { solutions: ['buildFromTerminal'] })
    })

    await test('can build bindings from node', () => {
        fixbind(require, 'serialport', { solutions: ['buildFromNode'] })
    })

    await test('can build bindings with npm install', () => {
        fixbind(require, 'serialport', { solutions: ['npmInstall'] })
    })
})