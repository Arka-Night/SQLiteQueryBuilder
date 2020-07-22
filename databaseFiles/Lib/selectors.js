module.exports = {
    async select(db, ...data) {
        const sql = `SELECT ${data.join(', ')} FROM ${this.table} `;

        const p = new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        })

        return await p.then(rows => rows).catch((err) => {throw new Error(err)});

    },

    async insert(configObject) {
        const objectArray = Object.entries(configObject);

        const column = [];
        const value = [];

        objectArray.forEach(item => {
            column.push(item[0]);
            value.push(item[1]);
        });

        const p = new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO ${this.table} (${column.join(', ')}) VALUES (${'"' + value.join('", "') + '"'})`, (err) => {
                if(err) {
                    reject(err);
                } else { 
                    resolve(1);
                }
            });
        });

        return await p.then(rows => rows).catch((err) => {throw new Error(err)});
        
    },
}