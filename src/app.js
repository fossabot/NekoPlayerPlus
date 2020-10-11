const {app, BrowserWindow, protocol, ipcMain, autoUpdater} = require('electron');
const log = require('electron-log');
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
function createWindow () {
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

function sendStatus(text) {
    log.info(text);
    if (win) {
      win.webContents.send('message', text);
    }
  }
  
  //-------------------------------------------------------------------
  // Auto updates
  //-------------------------------------------------------------------
  autoUpdater.on('checking-for-update', () => {
    sendStatus('Checking for update...');
  })
  autoUpdater.on('update-available', (ev, info) => {
    sendStatus('Update available.');
    log.info('info', info);
    log.info('arguments', arguments);
  })
  autoUpdater.on('update-not-available', (ev, info) => {
    sendStatus('Update not available.');
    log.info('info', info);
    log.info('arguments', arguments);
  })
  autoUpdater.on('error', (ev, err) => {
    sendStatus('Error in auto-updater.');
    log.info('err', err);
    log.info('arguments', arguments);
  })
  autoUpdater.on('update-downloaded', (ev, info) => {
    sendStatus('Update downloaded.  Will quit and install in 5 seconds.');
    log.info('info', info);
    log.info('arguments', arguments);
    // Wait 5 seconds, then quit and install
    // setTimeout(function() {
    //   autoUpdater.quitAndInstall();  
    // }, 5000)
  })
  // Wait a second for the window to exist before checking for updates.
  //autoUpdater.setFeedURL('http://127.0.0.1:8080/');
  setTimeout(function() {
    log.info('starting update check');
    autoUpdater.checkForUpdates()  
  }, 1000);