const { app, BrowserWindow, protocol, ipcMain} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
let win;
//-------------------------------------------------------------------
// Logging
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//-------------------------------------------------------------------
// Define the menu
//-------------------------------------------------------------------
function createWindow() {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 1186,
    height: 691,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // y carga el index.html de la aplicación.
  win.setMenu(null)
  win.loadURL(`file://${__dirname}/www/index.html#v${app.getVersion()}`)
  win.maximizable = false
  autoUpdater.checkForUpdates();
  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });
  autoUpdater.on('update-not-available', () => {
    console.log("No hay actualizaciones")
  });
  autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
  });
  
  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded');
  });
  
  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });
  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools()
}

// Este método se llamará cuando Electron haya finalizado
// la inicialización y esté preparado para crear la ventana del navegador.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
