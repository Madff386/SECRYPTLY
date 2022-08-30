const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");
const menu = require('./UI/menu').menu;
const path = require('path');
app.commandLine.appendSwitch('ignore-certificate-errors');

const { Token } = require('./networking/api/auth');
const api = require('./networking/api/api');
const {RSAKey} = require('./cryptography/RSA');
const {AESKey} = require('./cryptography/AES');
const {Store} = require('./storage/store');

global.api = api;
global.fileKey = new AESKey("");
global.messageKey = new RSAKey();
global.secryptly = new Token();
global.settings = new Store("settings");
settings.create();
global.currentUserData = null;
global.win = null;


const ipcHandler = require('./ipc/ipc.handlers');


  
  

setupTitlebar();

const createWindow = () => {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 820,
        minHeight: 450,
        titleBarStyle: 'hidden',
        thickFrame:false,
        backgroundColor: '#303236',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,       
        }
    })

    const handleRedirect = (e, url) => {
        if(url != win.webContents.getURL()) {
          e.preventDefault()
          require('electron').shell.openExternal(url)
        }
    }
    
    win.webContents.on('will-navigate', handleRedirect)
    win.webContents.on('new-window', handleRedirect)

    Menu.setApplicationMenu(menu);

    win.webContents.openDevTools()
    
    win.loadFile(path.join(__dirname, '../dist/index.html'))

    attachTitlebarToWindow(win);
    
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


