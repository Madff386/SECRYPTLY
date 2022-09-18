const {RSAKey} = require('../cryptography/RSA');
const {AESKey} = require('../cryptography/AES');
const crypto = require('crypto');

function generateMessage(text, pubkey){
    let receiverKey = new RSAKey();

    receiverKey.importPublic(pubkey);

    let aesKey = new AESKey("");
    let secretKey = crypto.randomBytes(32);
    aesKey.importSecretKey(secretKey);

    let encrypted = aesKey.encrypt(text);

    let key = receiverKey.encrypt(secretKey.toString("base64"));

    return {
        iv: encrypted.iv,
        content: encrypted.content,
        key: key
    }
}

function seperateMessage(message){
    if (!message.key){
        return undefined;
    }
    let secretKey = messageKey.decrypt(message.key);

    let aesKey = new AESKey("");
    aesKey.importSecretKey(Buffer.from(secretKey, "base64"));

    let decrpyted = aesKey.decrypt({
        iv: message.iv, 
        content: message.content
    })
    return decrpyted;
}

function sendMessage(text, receiverId){
    return api.getUser(receiverId).then( response => {
        let message = generateMessage(text, response.data.pubkey);
        let data = api.sendMessage(receiverId, message).then( response => {
            return {response, message};
        }).catch( err => {
            if (err.response && err.response.status && err.response.status == 400) {
                
                return {response: err.response};
            }
            throw err;
        })
        return data;
    })
    
}

function retreiveMessage(fromId){
    return api.retreiveMessage(fromId).then( response => {
        return seperateMessage(response.data);
    })
}

exports.generateMessage = generateMessage;
exports.seperateMessage = seperateMessage;
exports.sendMessage = sendMessage;
exports.retreiveMessage = retreiveMessage;