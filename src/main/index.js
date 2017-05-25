import electron , { BrowserWindow, app, Menu, ipcMain } from 'electron';
import { enableLiveReload } from 'electron-compile';
import config from '../config';
import * as schemas from './schemas';
let mainWindow = void 0;
app.on('ready', () => {

  const knex = require('knex')({
    dialect: 'sqlite3',
    useNullAsDefault: false,
    connection: {
      filename: config.DB,
    }
  });
  const initializeTable = (tableName, schemaName) => {
    knex.schema.hasTable(tableName).then(function(exists) {
      if (!exists) {
        return knex.schema.createTable(tableName, t => schemas[schemaName](t));
      }
    });
  }
  
  initializeTable(`campaign`, `Campaign`);
  initializeTable(`character`, `Character`);
  initializeTable(`application`, `Application`);
  initializeTable(`player`, `Player`);

  enableLiveReload({strategy: 'react-hmr'});
  
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    nodeIntegration: true,
    acceptFirstMouse: true,
    frame: false,
    titleBarStyle: `hidden`,
    backgroundColor: '#2e2c29',
    enableLargerThanScreen: true,
    alwaysOnTop: false,
    show: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${config.STARTUP}`);

  // First Let's get the size of the mainWindow
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.center();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  process.exit();
});
