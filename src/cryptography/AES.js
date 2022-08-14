const crypto = require("crypto");
const algorithm = 'aes-256-ctr';

class AESKey{
    constructor(password){
        const secretKey = crypto.scryptSync(password, 'GfG', 32);
        this.secretKey = secretKey;
    }

    login(password){
        const secretKey = crypto.scryptSync(password, 'GfG', 32);
        this.secretKey = secretKey;
    }

    importSecretKey(key){
        this.secretKey = key;
    }

    encrypt(msg) {
    
        const iv = crypto.randomBytes(16);
    
        const cipher = crypto.createCipheriv(algorithm, this.secretKey, iv);
    
        const encrypted = Buffer.concat([cipher.update(msg), cipher.final()]);
    
        return {
            iv: iv.toString('base64'),
            content: encrypted.toString('base64')
        };
    }

    decrypt(hash) {

        const decipher = crypto.createDecipheriv(algorithm, this.secretKey, Buffer.from(hash.iv, 'base64'));
    
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'base64')), decipher.final()]);
    
        return decrpyted.toString();
    };
} 

exports.AESKey = AESKey;




