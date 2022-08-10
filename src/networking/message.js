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
    let pubkey = api.getUser(receiverId).pubkey;
    let message = generateMessage(text, pubkey);
    api.sendMessage(receiverId, message);
}

exports.generateMessage = generateMessage;
exports.seperateMessage = seperateMessage;
exports.sendMessage = sendMessage;