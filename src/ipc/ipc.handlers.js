
const {ipcMain} = require('electron');
const {Store} = require('../storage/store');
const {sendMessage, retreiveMessage} = require('../networking/message');

ipcMain.handle("LOGIN", (event, data) => {
    currentUserData = new Store(data.username);
    fileKey.login(data.password);
    messageKey.importKey(currentUserData.get("messageKey"));
    return secryptly.login(currentUserData.get("email"), data.password);
});


ipcMain.handle("CREATE_ACCOUNT", (event, data) => {
    return secryptly.createUser({
        email: data.email,
        password: data.password,
        username: data.username,
        pubkey: messageKey.exportPublic()
    }).then( response => {
        currentUserData = new Store(data.username);
        fileKey.login(data.password);
        currentUserData.set("messageKey", messageKey.exportKey());
        currentUserData.set("email", data.email);
        currentUserData.set("id", response.data.id);
        return {error: null};
    }).catch( error =>{
        return(error.response.data);
    })
})

ipcMain.handle("SEND_MSG", (event, data) => {
    return sendMessage(data.text, data.to).then( response => {
        return {error: null};
    }).catch( error => {
        return error.response.data;
    })
})

ipcMain.handle("GET_MSG", (event, data) => {
    return retreiveMessage(data.from);
})