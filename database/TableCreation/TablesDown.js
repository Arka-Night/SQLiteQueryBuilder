const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database/db.sqlite', sqlite.OPEN_READWRITE);

db.serialize(() => {
    if(process.argv[2]) {
        db.run('DROP TABLE '+ process.argv[2], () => {
            console.log('Tabela deletada');
        });

    } else {
        db.run('DROP TABLE people', () => {
            console.log('Tabela deletada');
        });
        
    }
});

db.close();