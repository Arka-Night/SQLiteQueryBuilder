const { select, where, distinct, order, limit } = require('./selectorsReturn/indexSelect');
const { del, wheredel } = require('./selectorsReturn/indexDelete');
const { update, whereup } = require('./selectorsReturn/indexUpdate');

function selection(...data) {
    const db = this.db;
    let actuallyProcess = this.actuallyProcess;

    actuallyProcess = {
        columns: data,
        table: this.table,
    };

    return {
        select: async () => await select(db, actuallyProcess),
        where: (column, value, operator = '=') => where(db, actuallyProcess, column, value, operator),
        distinct: () => distinct(db, actuallyProcess),
        order: (column, orderBy = 'ASC') => order(db, actuallyProcess, column, orderBy),
        limit: (lm) => limit(db, actuallyProcess, lm)
    };

}

function deleteColumn() {
    const db = this.db;
    let actuallyProcess = this.actuallyProcess;

    actuallyProcess = {
        table: this.table,
    };

    return {
        where: (column, value, operator = '=') => wheredel(db, actuallyProcess, column, value, operator),
        del: async () => del(db, actuallyProcess)
    }
}

function updateColumn(config) {
    const db = this.db;
    let actuallyProcess = this.actuallyProcess;

    actuallyProcess = {
        table: this.table,
        columns: []
    };

    Object.entries(config).forEach(column => {
        actuallyProcess.columns.push({
            name: column[0],
            value: column[1]
        });
    });

    return { 
        where: (column, value, operator = '=') => whereup(db, actuallyProcess, column, value, operator),
        update: () => update(db, actuallyProcess),
    }
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

    return await p.then(lastID => lastID).catch((err) => {throw new Error(err)});
    
}

module.exports = { selection, insert, deleteColumn, updateColumn }