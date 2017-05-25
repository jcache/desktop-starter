let path = require('path');
const STARTUP = path.join(__dirname, 'render', 'index.html');
const DB = path.join(__dirname, 'main','schemas', 'mydb.db');
module.exports = {
  ROOT_PATH: path.join(__dirname, '..'),
  STARTUP: STARTUP,
  DB
};
