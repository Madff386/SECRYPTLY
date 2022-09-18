const fs = require('fs');
const path = require('path');

exports.login = (email, password) => {
    return secryptly.login(email, password);
}

exports.createUser = (userData) => {
    return secryptly.createUser(userData);
}

exports.deleteUser = (userId) => {
    return secryptly.delete('/users/' + userId);
}

exports.updateUser = (userData) => {
    return secryptly.patch('/users/' + userData.id, userData);
}

exports.getUserId = (username) => {
    return secryptly.get('/users/' + username + '/id', {});
}

exports.getUser = (userId) => {
    return secryptly.get('/users/' + userId, {});
}

exports.getUserExtended = (userId) => {
    return secryptly.get('/users/' + userId + "/extended", {});
}



exports.sendMessage = (receiverId, message) => {
    return secryptly.post('/messages/' + receiverId, message);
}

exports.retreiveMessage = (fromId) => {
    return secryptly.get('/messages/received/' + fromId);
}

exports.getReceived = () => {
    return secryptly.get('/messages/received');
}

exports.getSent = () => {
    return secryptly.get('/messages/sent');
}

exports.onMessage = (callback) => {
    secryptly.stream('/messages/receive', callback); 
}


exports.setProfilePicture = (filePath) => {
    if (path.extname(filePath).toLowerCase() === '.png') {
        return secryptly.put('/resources/profilePicture', fs.createReadStream(filePath), 'image');
    }
    return new Promise(function(resolve, reject){
        resolve(false);
    });
}
