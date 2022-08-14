const { RSAKey } = require('../src/cryptography/RSA');
const expect = require('chai').expect;



describe('RSA', function() {
    it('Encrypt then decrypt should be the same', function(done) {
        let key = new RSAKey();
        let string = "Hello World!";
        let encrypted = key.encrypt(string);
        let decrypted = key.decrypt(encrypted);
        expect(decrypted).to.equal(string);
        done();
    });

    it('Encrypt then transfer keys then decrypt should be the same', function(done) {
        let key = new RSAKey();

        let pubkey = key.exportPublic();
        let enkey = new RSAKey();
        enkey.importPublic(pubkey);

        let string = "Hello World!";
        let encrypted = enkey.encrypt(string);
        
        let decrypted = key.decrypt(encrypted);
        expect(decrypted).to.equal(string);
        done();
    });

});