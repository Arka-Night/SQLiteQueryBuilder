const sqlite = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class Connection {
    constructor(configFile) {
        if(!configFile) {
            throw new Error('No config file parsed');
        }
        this.dbDirectory = path.join(process.cwd(), configFile.DBPath + '/db.sqlite');
        fs.readFileSync(this.dbDirectory);
        this.db = new sqlite.Database(this.dbDirectory, sqlite.OPEN_READWRITE);
    }

    insertOnDB(table, configObject) {
        const db = this.db;
        const objectArray = Object.entries(configObject);

        const column = [];
        const value = [];

        objectArray.forEach(item => {
            column.push(item[0]);
            value.push(item[1]);
        });

        db.serialize(() => {
            db.run(`INSERT INTO ${table} (${column.join(',')}) VALUES (${'"' + value.join('", "') + '"'})`);
        });

    }

}

module.exports = Connection;