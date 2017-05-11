import { spawn } from 'child_process';
import electron from 'electron';
import browserSync from 'browser-sync';
import browserSyncConnectUtils from 'browser-sync/lib/connect-utils';
import historyApiFallback from 'connect-history-api-fallback';
require('path');

const Bsync = browserSync.create();
const getRootUrl = (options) => {
  const port = options.get('port');
  return `http://localhost:${port}`;
};

const getMainUrl = (options) => {
  const pathname = browserSyncConnectUtils.clientScript(options);
  return getRootUrl(options) + pathname;
};

const BrowserSyncOPTS = {
  ui: false,
  ghostMode: true,
  open: true, // false
  notify: false,
  logPrefix: 'downstream',
  logSnippet: true,
  localOnly: true,
  logLevel: 'info',
  middleware: [
    historyApiFallback()
  ],
  socket: { domain: getRootUrl }
};


// NODE ENVIRONMENT
const args = process.argv.length > 2 ? process.argv: false;
if (args) {
  let dev = args.indexOf('development');
  let prod = args.indexOf('production');
  if (dev || prod) process.env.NODE_ENV === dev ? dev: prod;
}

Bsync.init(BrowserSyncOPTS, (err, bs) => {
  // ERRORS
  if (err) return console.error(err);
  const electroSpawn = spawn(electron, ['.'], {
    stdio: 'inherit',
    env: {
      ...{
        NODE_ENV: 'development',
        BROWSER_SYNC_MAIN_URL: getMainUrl(bs.options),
      },
      ...process.env,
    },
  });

  electroSpawn.on('close', (code) => {
    if (code !== 0) console.log(`WARNING: Electron process exited with code ${code}`);
    Bsync.exit();
    process.exit();
  });

  // WATCH
  Bsync.watch(
    [
      'src/main/index.js',
      'src/render/**/*.html',
      'src/render/**/*.less',
    ]
  ).on('change', Bsync.reload);
});
