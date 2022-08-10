

const { generateMessage, seperateMessage, sendMessage } = require('./src/networking/message');
const {RSAKey} = require('./src/cryptography/RSA');
const { Token } = require('./src/networking/api/auth');
const api = require('./src/networking/api/api');

global.messageKey = new RSAKey();
global.secryptly = new Token();
global.api = api;

pubkey = messageKey.exportKey().publicKey;
let message = generateMessage("Hello Wolrd!", pubkey);
console.log(message);


console.log(seperateMessage(message))

api.login("dd", "ddhd").then( success => {
    return api.getUserExtended('62e39f7618633703fb909471')
}).then( response => {

    console.log(response.data);
})

//sendMessage("Hello World!", '62e39f7618633703fb909471')

