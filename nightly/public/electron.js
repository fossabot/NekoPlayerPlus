/* eslint-disable import/no-extraneous-dependencies */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // desabilitado advetencias porque no me gusta verlas
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
// in the main store
const { forwardToRenderer, triggerAlias, replayActionMain } = require('electron-redux');

const { applyMiddleware, createStore, combineReducers } = require('redux');


const path = require('path');
const isDev = require('electron-is-dev');
const url = require('url');
const  reducers  = require('../src/Redux/Redux-reducer');

let mainWindow;
let prueva;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });

  prueva = new BrowserWindow({
    width: 900,
    height: 680,
    parent: mainWindow,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.maximize();

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  prueva.loadURL(
    isDev
      ? 'http://localhost:3000/#porueva'
      : url.format({
          pathname: path.join(__dirname, '../build/index.html'),
          hash: 'porueva',
          protocol: 'file',
          slashes: true
        })
  );

  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }

  // eslint-disable-next-line no-return-assign
  mainWindow.on('closed', () => (mainWindow = null));

  prueva.on('close', e => {
    e.preventDefault();
    prueva.hide();
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', event => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('toggle-prueva', () => {
  prueva.show();
  prueva.maximize();
});

const middleWare = (store) => (next) => (action) => {
  console.log('Renderer middleWare' + action);
  next(action);
};

const INITIAL_STATE = {
  count: 0,
  history: [],
};

const store = createStore(
  reducers,
  applyMiddleware(
    triggerAlias, // optional, see below
    middleWare,
    forwardToRenderer // IMPORTANT! This goes last
  )
);

store.subscribe(() => {
  console.log(store.getState());
});

replayActionMain(store);