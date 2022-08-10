
const {ipcMain} = require('electron');


ipcMain.handle("LOGIN", (event, data) => {
    
    return secryptly.login(data.email, data.password);
});