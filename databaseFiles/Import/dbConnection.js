const sqlite = require('sqlite3').verbose();
const fs = require('fs');

class Connection {
    constructor(dbDirectory) {
        fs.readFile(dbDirectory, (err, file) => {
            console.log(file);
        });
        console.log(fs.realpathSync('.'));
        this.dbDirectory = fs.realpathSync(dbDirectory);
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