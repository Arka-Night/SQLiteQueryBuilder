const sqlite = require('sqlite3').verbose();

class connection {
    constructor(db) {
        this.db = sqlite.Database(db, sqlite.OPEN_READWRITE);
    }


}

module.exports = connection;