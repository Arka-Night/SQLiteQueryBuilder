const { select, where, distinct, order, limit } = require('./selectorsReturn');

function selection(...data) {
    const db = this.db;
    let actuallyProcess = this.actuallyProcess;

    actuallyProcess = {
        columns: data,
        table: this.table,
    };

    return {
        select: async () => {
            return await select(db, actuallyProcess);
        },
        
        where: (column, value, operator = '=') => {
            return where(db, actuallyProcess, column, value, operator);
        },

        distinct: () => {
            return distinct(db, actuallyProcess);
        },

        order: (column, orderBy = 'ASC') => {
            return order(db, actuallyProcess, column, orderBy);
        },

        limit: (lm) => {
            return limit(db, actuallyProcess, lm);
        }
    };

}

async function insert(configObject) {
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

    return await p.then(resolve => resolve).catch((err) => {throw new Error(err)});
    
}

module.exports = { selection, insert }