const fs = require('fs');
const path = require('path');
const electron = require('electron');



class Store{
    constructor(name) {
        const userDataPath = electron.app.getPath('userData');
        this.path = path.join(userDataPath, name + '.json');
        if (!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, JSON.stringify({}, null, 2));
        }
    }

    set(key, val){
        let data = JSON.parse(fs.readFileSync(this.path));
        data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    }

    get(key){
        let data = JSON.parse(fs.readFileSync(this.path));
        return data[key];
    }
}

exports.Store = Store;

