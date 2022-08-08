const { app, BrowserWindow, Menu} = require('electron');
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");
const language = 'en-AU' // TODO: read from either settings or system language
const strings = require('./UI/strings.json')[language];
const menu = require('./UI/menu').menu;
const path = require('path');

app.commandLine.appendSwitch('ignore-certificate-errors')

setupTitlebar();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        titleBarStyle: 'hidden',
        thickFrame:false,
        backgroundColor: '#303236',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false        
        }
    })

    Menu.setApplicationMenu(menu);

    win.webContents.openDevTools()
    
    win.loadFile(path.join(__dirname, 'index.html'))

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

