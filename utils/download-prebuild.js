const { resolve } = require("path");
const { download } = require("prebuild-install");
const util = require("prebuild-install/util");

const downloadPrebuild = {
  msg: 'download bindings',
  fn: (package, options, ctx) => new Promise(async (_resolve, reject) => {
    try {
      const _pathBak = resolve();

      // rc has self executing scripts that use the CWD, so we need to change dir first
      process.chdir(resolve(package.projectPath, "node_modules/@serialport/bindings"));

      const rc = require("prebuild-install/rc");

      const opts = rc({ config: { runtime: options.runtime } });

      opts.pkg = package.packageJson;
      opts.nolocal = true;

      const url = util.getDownloadUrl(opts);


      download(url, opts, (err, res) => {
        if (err) {
          console.error(err);
          throw err;
        }
        process.chdir(_pathBak); // restore initial CWD
        _resolve();
      });
    } catch (err) {
      reject(err);
    }
  })
}
module.exports = { downloadPrebuild };
