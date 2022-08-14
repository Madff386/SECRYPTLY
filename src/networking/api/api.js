


exports.login = (email, password) => {
    return secryptly.login(email, password);
}

exports.createUser = (userData) => {
    return secryptly.createUser(userData);
}

exports.deleteUser = (userId) => {
    return secryptly.delete('/users/' + userId, {});
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

