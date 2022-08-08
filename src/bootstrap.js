const send_msg = require("./networking/send_msg.js")
const Token = require('./networking/api/auth').Token;
const RSAKey = require("./cryptography/RSA").RSAKey;
const api = require('./networking/api/api');
const apiCallbacks = require('./UI/callbacks/api.callback');



const secryptly = new Token;
const language = 'en-AU'  // TODO: read from either settings or system language
const strings = require('./UI/strings.json')[language];




require('./UI/lib/main');

/*
api.login("dd", "ddhd").then( success => {
    if (success){
        console.log('logged in');
    } else {
        console.log('failed to log in');
    }
})*/



