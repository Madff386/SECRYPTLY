const language = 'en-AU' // TODO: read from either settings or system language
const strings = require('./strings.json')[language];


function t(text){
    return strings[text];
}

exports.t = t;