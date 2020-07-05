const sqlite = require('sqlite3').verbose();

class Connection {
    constructor(dbDirectory) {
        this.db = new sqlite.Database(dbDirectory, sqlite.OPEN_READWRITE);
        this.dbDirectory = dbDirectory;
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