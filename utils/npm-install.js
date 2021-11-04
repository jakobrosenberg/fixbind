const { execSync } = require("child_process");
const { resolve } = require("path");
const { download } = require("prebuild-install");
const util = require("prebuild-install/util");

/** @type {Solution} */
const npmInstall = {
  msg: 'npm install in bindings package',
  fn: (package, options, ctx) => new Promise(async (_resolve, reject) => {
    execSync('npm install', { cwd: package.packagePath })
  })
}
module.exports = { npmInstall };
