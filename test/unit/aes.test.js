
const { AESKey } = require('../../src/cryptography/AES');
const expect = require('chai').expect;



describe('AES', function() {
    it('Encrypt then decrypt should be the same', function(done) {
        let password = "qwerty";
        let key = new AESKey(password);
        let string = "Hello World!";
        let encrypted = key.encrypt(string);
        let decrypted = key.decrypt(encrypted);
        expect(decrypted).to.equal(string);
        done();
    });

    
});