// var vscode = require('vscode');
const { buildFromNode, buildFromTerminal } = require('./utils/build');
const { downloadPrebuild } = require('./utils/download-prebuild');
const { removeBindings } = require('./utils/remove');
const { resolvePackage } = require('./utils/resolve-package')
const { npmInstall } = require('./utils/npm-install')
const { createLogger } = require('consolite')

/** @type {Options} */
const defaultOptions = {
    runtime: process.versions.electron ? 'electron' : 'node',
    solutions: ['downloadPrebuild', 'buildFromNode', 'buildFromTerminal', 'npmInstall'],
    onSingleFail: err => err,
    force: false
}


// import the package, if it fails, try the next solution, rinse repeat.

/**
 * 
 * @param {require} _require 
 * @param {string} name
 * @param {Partial<Options>=} input 
 * @returns {Promise}
 */
async function fixbind(_require, name, input) {
    /** @type {Options} */
    const options = ({ ...defaultOptions, ...input })
    const package = resolvePackage(_require.resolve(name))
    const log = createLogger(`[fixbind][${name}]`)
    const ctx = { log }

    /** 
     * Solutions to try for getting working bindings     
     * @type {{name: SolutionName, solution: Solution}[]}
     **/
    const allSolutions = (Object.entries({
        downloadPrebuild,
        buildFromNode,
        buildFromTerminal,
        npmInstall
    }).map(([name, solution]) => ({ name, solution })))

    const solutions = allSolutions.filter(solution => options.solutions.includes(solution.name))

    if (options.force)
        removeBindings(package, ctx)

    return new Promise(async (resolve, reject) => {
        while (true) {
            // check if we can import the package
            try {
                log.log('import module...')
                delete _require.cache[_require.resolve(package.name)];
                _require(package.name);
                log.log('import module... success')
                break;
            }
            // if not, try a solution
            catch (err) {
                log.log('import module... failed', err.message)

                if (!solutions.length) {
                    const err = new Error(`All solutions failed for ${package.name}`)
                    err['fixbind'] = { package, _require, options }
                    reject(err)
                }

                removeBindings(package, ctx)

                const { solution } = solutions.shift()
                const { fn, msg } = solution
                log.log(msg + '...')
                try {
                    await fn(package, options, ctx)
                    log.log(msg + '... success')
                    resolve(package)
                } catch (err) {
                    options.onSingleFail(err, package)
                    log.error(msg + '... failed', err)
                }
            }
        }
    })
}

module.exports = { fixbind }