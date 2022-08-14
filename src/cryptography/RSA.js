const crypto = require("crypto");


class RSAKey {
    constructor(){
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 2048,
            publicKeyEncoding: {
              type: "pkcs1",
              format: "pem",
            },
            privateKeyEncoding: {
              type: "pkcs1",
              format: "pem",
            },
          });
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    exportKey(){
      //export public and private keys to disk
      return {
        privateKey: fileKey.encrypt(this.privateKey),
        publicKey: fileKey.encrypt(this.publicKey)
      }
    }

    importKey(key){
      //decrypt with fileKey

      this.privateKey = fileKey.decrypt(key.privateKey);
      this.publicKey = fileKey.decrypt(key.publicKey);
      //import public and private keys from disk
    }

    importPublic(key){
      this.publicKey = key;
    }

    exportPublic(){
      return this.publicKey;
    }

    

    encrypt(msg){
        const encryptedData = crypto.publicEncrypt(
            {
              key: this.publicKey,
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
              oaepHash: "sha256",
            },
            Buffer.from(msg)
          );
          return encryptedData.toString("base64");
    }

    decrypt(msg){
        const decryptedData = crypto.privateDecrypt(
            {
              key: this.privateKey,
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
              oaepHash: "sha256",
            },
            Buffer.from(msg, 'base64')
          );
          
        return decryptedData.toString();
    }
}


exports.RSAKey = RSAKey;





