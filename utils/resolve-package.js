const { existsSync } = require('fs');
const { dirname } = require('path');


const getNearestProjectPath = path => existsSync(path + '/package.json')
    ? path : getNearestProjectPath(dirname(path))


/** @param {string} packagePath */
const resolvePackage = packagePath => {
    packagePath = getNearestProjectPath(packagePath)
    const packageJson = require(packagePath + '/package.json')
    return {
        packageJson,
        packagePath,
        name: packageJson.name,
        projectPath: getNearestProjectPath(dirname(packagePath)),
    }
}

module.exports = { resolvePackage }