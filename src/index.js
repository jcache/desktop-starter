const path = require('path');
const config = require('./config');
if (process.env.NODE_ENV === 'development') {
  var appRoot = path.join(__dirname, '..');
  require('electron-compile').init(appRoot, require.resolve('./main'));
} else {
  require('./main');
};
