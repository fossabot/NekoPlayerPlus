/* ********** desabilitado advetencias porque no me gusta verlas **************** */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
/* ****************************************************************************** */
/* ************************** importando electron ******************************* */
const { app, BrowserWindow, Menu, screen, nativeImage, ipcMain } = require('electron');
const {autoUpdater} = require("electron-updater");
/* *********************** Dependencias para Electron  ************************** */
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');
const ver = require("../package.json").version;
const name = require("../package.json").name;
// const server = require('../../backend/bin/www');
/* ************************** Eliminar menu de electron ******************************* */
Menu.setApplicationMenu(null);

/* ************************** icono a la ventana electron ******************************* */
const image = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
image.setTemplateImage(true);
/* ****************************************************************************** */
/* ******************** Objetos Para iniciarlizar Ventanas ********************** */

/* ****************************************************************************** */
/* ************************* constantes para Url ******************************** */
const mainUrl = isDev
  ? "http://localhost:3000/"
  : url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file',
      slashes: true
    });
/* ************************************************************************************ */
/* ******** funcion principal para la creacion de ventans y envots de estas *********** */
function createWindow() {
  /* ***** determina el alto y ancho de la pantala para usar pantalla completa ******** */
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  /* ********************************************************************************** */
  // Create the browser window.
  const mainwindow = new BrowserWindow({
    width: 1186,
    height: 691,
    resizable: false,
    icon:path.join(__dirname,'window_icon.png'),
    title: "NekoPlayer Plus - Nightly v"+app.getVersion(),
    backgroundColor: "#000",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // and load the index.html of the app.
  mainwindow.loadURL(mainUrl);

  autoUpdater.checkForUpdates();
  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });
  autoUpdater.on('update-not-available', () => {
    console.log("No hay actualizaciones")
  });
  autoUpdater.on('update-available', () => {
    mainwindow.webContents.send('update_available');
  });
  
  autoUpdater.on('update-downloaded', () => {
    mainwindow.webContents.send('update_downloaded');
  });
  
  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });

  // Open the DevTools.
  if (isDev) {
    mainwindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("app-quit-now", (e, exit) => {
  if (exit == "true") {
    app.quit();
  }
});