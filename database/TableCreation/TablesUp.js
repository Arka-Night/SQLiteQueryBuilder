const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:/Users/elonj/Desktop/JS/Sandbox/SQLite db/database/db.sqlite', sqlite3.OPEN_READWRITE);

db.serialize(() => {
    db.run("CREATE TABLE people (userId INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)");


    console.log('Tabela criada');
});
 
db.close();