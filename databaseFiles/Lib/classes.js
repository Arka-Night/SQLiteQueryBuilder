class Table {
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }

    async insert(configObject) {
        const db = this.db;
        const objectArray = Object.entries(configObject);

        const column = [];
        const value = [];

        objectArray.forEach(item => {
            column.push(item[0]);
            value.push(item[1]);
        });

        const prom = new Promise((resolve, reject) => {
            db.run(`INSERT INTO ${this.table} (${column.join(', ')}) VALUES (${'"' + value.join('", "') + '"'})`, (err) => {
                if(err) {
                    reject(err);
                }
                resolve(1);
            });
        });

        return await prom.then(rows => rows).catch((err) => {throw new Error(err)});
        
    }

    async select(...data) {
        const db = this.db;
        const sql = `SELECT ${data.join(', ')} FROM ${this.table}`;

        const prom = new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        })

        return await prom.then(rows => rows).catch((err) => {throw new Error(err)});
        
    }

}

module.exports = Table;