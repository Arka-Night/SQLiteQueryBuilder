const sqlite = require('sqlite3').verbose();
const table = require('./table');

function build({ up }, dbPath) {
    const db = new sqlite.Database(dbPath);

    db.run(up(table), (err) => {
        if(err) {
            throw new Error(err);
            
        }

    });

}

function drop({ down }, dbPath) {
    const db = new sqlite.Database(dbPath);

    db.run(down(table), (err) => {
        if(err) {
            throw new Error(err);

        }

    });

}

module.exports = { build, drop };