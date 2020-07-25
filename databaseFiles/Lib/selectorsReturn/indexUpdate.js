const compiler = require('../processors/updateProcessor');

function orWhere(db, actuallyProcess, column, value, operator) {
    actuallyProcess.where.push({
        conditional: 'OR',
        column,
        operator,
        value
    });

    let Return = {
        andWhere: (column, value, operator = '=') => {
            return andWhere(db, actuallyProcess, column, value, operator);
        },

        orWhere: (column, value, operator = '=') => {
            return orWhere(db, actuallyProcess, column, value, operator);
        },

        update: async () => {
            return await update(db, actuallyProcess);
        }
    };

    return Return;
}

function andWhere(db, actuallyProcess, column, value, operator) {
    actuallyProcess.where.push({
        conditional: 'AND',
        column,
        operator,
        value
    });

    let Return = {
        andWhere: (column, value, operator = '=') => {
            return andWhere(db, actuallyProcess, column, value, operator);
        },

        orWhere: (column, value, operator = '=') => {
            return orWhere(db, actuallyProcess, column, value, operator);
        },

        update: async () => {
            return await update(db, actuallyProcess);
        }
    };

    return Return;
}

function whereup(db, actuallyProcess, column, value, operator) {
    actuallyProcess.where = [
        {
            conditional: 'init',
            column,
            operator,
            value
        }
    ];

    let Return = {
        andWhere: (column, value, operator = '=') => {
            return andWhere(db, actuallyProcess, column, value, operator);
        },

        orWhere: (column, value, operator = '=') => {
            return orWhere(db, actuallyProcess, column, value, operator);
        },

        update: async () => {
            return await update(db, actuallyProcess);
        }
    };

    return Return;
}

async function update(db, actuallyProcess) {
    const p = new Promise((resolve, reject) => {
        db.all(compiler(actuallyProcess), (err) => {
            if(err) {
                reject(err)
            } else {
                resolve(1);
            }
        });
    });

    return await p.then((resolve) => resolve).catch((err) => {throw new Error(err)});
    
}

module.exports = { update, whereup }