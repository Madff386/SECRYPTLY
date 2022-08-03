const send_msg = require("./networking/send_msg.js")
const Token = require('./networking/api/auth').Token;
const RSAKey = require("./cryptography/RSA").RSAKey;
const api = require('./networking/api/api');
const apiCallbacks = require('./UI/callbacks/api.callback');



const keys = new RSAKey();
let enc = keys.encrypt("Hello worold");
console.log(enc);
console.log(keys.decrypt(enc));


const secryptly = new Token;
const locale = Intl.DateTimeFormat().resolvedOptions().locale;


require('./UI/lib/main');

/*
api.login("dd", "ddhd").then( success => {
    if (success){
        console.log('logged in');
    } else {
        console.log('failed to log in');
    }
})*/



