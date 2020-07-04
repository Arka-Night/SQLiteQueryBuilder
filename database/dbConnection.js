const sqlite = require('sqlite3').verbose();
const fs = require('fs');

const json = JSON.parse(fs.readFileSync('./package.json'));

class Connection {
    constructor(db) {
        this.db = new sqlite.Database(db, sqlite.OPEN_READWRITE);
        console.log(json);
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