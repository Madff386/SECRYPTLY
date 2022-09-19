const { generateMessage, seperateMessage } = require('../../src/networking/message');
const expect = require('chai').expect;
const {RSAKey} = require('../../src/cryptography/RSA');



describe('Message', function() {
    it('generate then seperate should be the same', function(done) {
        global.messageKey = new RSAKey();
        let string = "Hello world!";
        pubkey = messageKey.exportPublic();
        let message = generateMessage(string, pubkey);
        expect(seperateMessage(message)).to.equal(string);
        done();
    });

    
});