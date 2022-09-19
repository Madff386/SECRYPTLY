const fs = require('fs');
const path = require('path');
const electron = require('electron');



class Store{
    constructor(name) {
        const userDataPath = electron.app.getPath('userData');
        this.path = path.join(userDataPath, name + '.json');
        this.exists = fs.existsSync(this.path);
    }

    create(start = {}){
        if (!fs.existsSync(this.path) || start != {}){
            fs.writeFileSync(this.path, JSON.stringify(start, null, 2));
        }
        this.exists = true;
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

    delete(){
        fs.unlinkSync(this.path);
    }

    dump(){
        return JSON.parse(fs.readFileSync(this.path));
    }
}

exports.Store = Store;

