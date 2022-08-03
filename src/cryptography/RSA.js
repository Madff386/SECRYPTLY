const crypto = require("crypto");


class RSAKey {
    constructor(){
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 2048,
          });
        this.publicKey = publicKey;
        this.privateKey = privateKey;
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
          
        console.log("decrypted data: ", decryptedData.toString());
    }
}


exports.RSAKey = RSAKey;





