const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('C:/Users/elonj/Desktop/JS/Sandbox/SQLite db/database/db.sqlite', sqlite.OPEN_READWRITE);

db.serialize(() => {
    if(process.argv[2]) {
        db.run('DROP TABLE '+ process.argv[2]);

    } else {
        db.run('DROP TABLE people');
        
    }

    console.log('Tabela deletada');
});

db.close();