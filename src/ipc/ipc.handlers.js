const {ipcMain, nativeTheme} = require('electron');
const {Store} = require('../storage/store');
const {sendMessage, retreiveMessage} = require('../networking/message');
const { contactsContextMenu } = require('../UI/menu');
const logger = require('../common/logging/logger');

ipcMain.handle("LOGIN", (event, data) => {
    
    currentUserData = new Store(data.username);
    if (!currentUserData.exists){
        return {success: false, error: "User doesn't exist on this device"}; 
    }
    fileKey.login(data.password);
    const messageKeySuccess = messageKey.importKey(currentUserData.get("messageKey"));
    return secryptly.login(currentUserData.get("email"), data.password).then( success => {
        if (success && messageKeySuccess){
            win.webContents.send("LOGGED_IN", data.username);

            api.onMessage((data) => {
                win.webContents.send('MESSAGE_RECEIVED', JSON.parse(data.toString()));
            });

            return {success: true};
        }
        if (success == messageKeySuccess){
            return {success: false, error: "Inncorrect Username or Password"};
        } else {
            if (success){
                return {success: false, error:"Local key outdated"};
            }
            return {success: false, error:"Inncorrect Username or Password"}
        }  
    }).catch( err => {
        if (err.response && err.response.status && err.response.status == 404) {
            return {success: false, error: "User doesn't exist"};
        }
    });
});


ipcMain.handle("CREATE_ACCOUNT", (event, data) => {
    return secryptly.createUser({
        email: data.email,
        password: data.password,
        username: data.username,
        pubkey: messageKey.exportPublic()
    }).then( response => {
        currentUserData = new Store(data.username);
        currentUserData.create();
        fileKey.login(data.password);
        currentUserData.set("messageKey", messageKey.exportKey());
        currentUserData.set("email", data.email);
        currentUserData.set("id", response.data.id);
        currentUserData.set("contacts", []);
        return {error: null};
    }).catch( error =>{
        return(error.response.data);
    })
})

ipcMain.handle("GET_MY_ID", (event, data) => {
    return currentUserData.get("id");
})

ipcMain.handle("GET_MY_DATA", (event, data) => {
    return api.getUserExtended(currentUserData.get("id")).then( response => {
        return response.data;
    })
})

ipcMain.handle("SEND_MSG", (event, data) => {
    return sendMessage(data.text, data.to).then( response => {
        win.webContents.send("UPDATE_ORDER", {});
        return {message: response.message, error: response.response.data.error};
    })
})

ipcMain.handle("GET_MSG", (event, data) => {
    return retreiveMessage(data.from)
    .catch(err => {
        if (err.response && err.response.status && err.response.status == 404) {
          return "";
        } else {
          throw err;
        }
    });
})

ipcMain.handle("GET_USER", (event, data) => {
    return api.getUser(data.id).then( response => {
        return {...response.data, status: response.status};
    }).catch( err => {
        if (err.response && err.response.status && err.response.status == 404) {
            return {status: 404};
        }
        throw err;
    })
})

ipcMain.handle("GET_RECEIVED", (event, data) => {
    return api.getReceived(data.id).then( response => {
        return response.data;
    })
})

ipcMain.handle("GET_SENT", (event, data) => {
    return api.getSent(data.id).then( response => {
        return response.data;
    })
})


ipcMain.on("CONTACT_CONTEXT_MENU", (event, data) => {
    let contactsContext = contactsContextMenu(data);
    contactsContext.popup();
})


ipcMain.on("SWITCH_CONTACT", (event, data) => {
    win.webContents.send("SWITCH_CONTACT", data);
})

ipcMain.handle("ADD_CONTACT", (event, data) => {
    let contacts = currentUserData.get("contacts");
    return api.getUserId(data).then( response => {
        if (!contacts.includes(response.data.id)){
            contacts.push({id: response.data.id, time: new Date().toString()});
            currentUserData.set("contacts", contacts);
            win.webContents.send("ADD_CONTACT", {});
            return true;
        }
        return true
    }).catch( err => {
        if(err.response && err.response.status && err.response.status == 404) {
            return false;
        }
        logger.error(err);
        return false;
    })
    
})

ipcMain.handle("GET_STORED", (event, data) => {
    return currentUserData.get("contacts");
})

ipcMain.on("PING", (event, data) => {
    win.webContents.send("PING", data);
})

ipcMain.on("REFRESH", (event, data) => {
    win.webContents.send("REFRESH", data);
})

ipcMain.on("CHANGE_THEME", (event, theme) => {
    nativeTheme.themeSource = theme;
    settings.set("theme", theme);
    win.webContents.send("SHOULD_USE_DARK", nativeTheme.shouldUseDarkColors);
    
})

ipcMain.handle("GET_THEME", (event, data) => {
    return nativeTheme.shouldUseDarkColors;
})

ipcMain.handle("GET_THEME_SOURCE", (event, data) => {
    return settings.get("theme");
})

ipcMain.on("SETTINGS", (event, data) => {
    win.webContents.send("SETTINGS", data);
})

ipcMain.handle("UPDATE_USER_DATA", (event, data) => {
    delete data.pubkey;
    data['id'] = currentUserData.get("id");
    return api.updateUser(data).then( response => {
        if (response.status == 204){
            if (Object.keys(data)[0] != 'password') {
                currentUserData.set(Object.keys(data)[0], data[Object.keys(data)[0]])
            } else {
                fileKey.login(data[Object.keys(data)[0]]);
                currentUserData.set("messageKey", messageKey.exportKey()); //TODO: test this 
            }
            return { success: true };
        }
        return { success: false, error: response.status };
    }).catch( err => {
        if (err.response && err.response.data && err.response.data.error) {
            return { success: false, error: err.response.data.error };
        }
        return { success: false, error: err.message};
    })
})


ipcMain.handle("SET_PROFILE_PICTURE", (event, data) => {
    return api.setProfilePicture(data)
        .then( response => {
            if (response && response.status == 201){
                return true;
            } 
            return false;
        })
        .catch( err => {
            return false;
        })
})

ipcMain.on("POPUP", (event, data) => {
    win.webContents.send("POPUP", data);
})


ipcMain.handle("DELETE_ACCOUNT", (event, data) => {
    return api.deleteUser(currentUserData.get("id")).then( response => {
        currentUserData.delete();
        return {success: true};
    }).catch( err => {
        logger.error(err);
        return {success: false, error: err.message};
    })
})

ipcMain.on("LOGOUT", (event, data) => {
    currentUserData = null;
    fileKey.logout();
    messageKey.regenerate();
    secryptly.logout();
    win.webContents.send("LOGOUT", {});
})


ipcMain.on("i18n.t", (event, text) => {
    event.returnValue = i18n.t(text);
})