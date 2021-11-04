/**
 * @typedef {('downloadPrebuild'|'buildFromNode'|'buildFromTerminal'|'npmInstall')} SolutionName
 *
 * @typedef {{log: import('consolite').ConsoliteLogger}} Ctx
 *
 * @typedef {object} Options
 * @prop {'electron'|'node'} runtime
 * @prop {SolutionName[]} solutions
 * @prop {(err, Package)=>void} onSingleFail
 * @prop {boolean} force force deletion of old bindings
 *
 * @typedef {Object} Package
 * @prop {Object} packageJson
 * @prop {string} packagePath
 * @prop {string} name
 * @prop {string} projectPath
 *
 * @callback SolutionCallback
 * @param {Package} package
 * @param {Options} options
 * @param {Ctx} ctx
 *
 * @typedef {object} Solution
 * @prop {string} msg
 * @prop {SolutionCallback} fn
 */
