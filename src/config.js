let path = require('path');
const STARTUP = path.join(__dirname, 'render', 'index.html');
module.exports = {
  ROOT_PATH: path.join(__dirname, '..'),
  STARTUP: STARTUP
};
