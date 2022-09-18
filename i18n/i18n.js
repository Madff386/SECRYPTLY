
class I18n {

    constructor() {
        this.locale = 'en-AU';
        this.strings = require('./en-AU/strings.json');
    }

    setLocale(locale) {
        this.locale = locale;
        this.strings = require('./' + locale + '/strings.json');
    }

    t(text){
        return this.strings[text];
    }
}

exports.I18n = I18n;