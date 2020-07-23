const compiler = require('../processors/selectProcessor');

function order(db, actuallyProcess, column, orderBy) {
    if(actuallyProcess.order === undefined) actuallyProcess.order = [];

    actuallyProcess.order.push({
        column,
        order: orderBy
    });

    let Return = {
        select: async () => {
            return await select(db, actuallyProcess);
        }
    };

    if(actuallyProcess.where === undefined) Return.where = (column, value, operator = '=') => {return where(db, actuallyProcess, column, value, operator)};
    if(actuallyProcess.distinct === undefined) Return.distinct = () => {return distinct(db, actuallyProcess);};
    if(actuallyProcess.limit === undefined) Return.limit = (lm) => {return limit(db, actuallyProcess, lm);};

    return Return;
}

function offset(db, actuallyProcess, offset) {
    actuallyProcess.offset = offset;

    let Return = {
        select: async () => {
            return await select(db, actuallyProcess);
        }
    };

    if(actuallyProcess.where === undefined) Return.where = (column, value, operator = '=') => {return where(db, actuallyProcess, column, value, operator)};
    if(actuallyProcess.distinct === undefined) Return.distinct = () => {return distinct(db, actuallyProcess);};
    if(actuallyProcess.order === undefined) Return.order = (column, orderBy = 'ASC') => {return order(db, actuallyProcess, column, orderBy);};

    return Return;
}

function limit(db, actuallyProcess, limit) {
    actuallyProcess.limit = limit;

    let Return = {
        offset: (off) => {
            return offset(db, actuallyProcess, off);
        },

        select: async () => {
            return await select(db, actuallyProcess);
        }
    };

    if(actuallyProcess.where === undefined) Return.where = (column, value, operator = '=') => {return where(db, actuallyProcess, column, value, operator)};
    if(actuallyProcess.distinct === undefined) Return.distinct = () => {return distinct(db, actuallyProcess);};
    if(actuallyProcess.order === undefined) Return.order = (column, orderBy = 'ASC') => {return order(db, actuallyProcess, column, orderBy);};

    return Return;
}

function distinct(db, actuallyProcess) {
    actuallyProcess.distinct = true;

    let Return = {
        select: async () => {
            return await select(db, actuallyProcess);
        }
    };

    if(actuallyProcess.where === undefined) Return.where = (column, value, operator = '=') => {return where(db, actuallyProcess, column, value, operator)};
    if(actuallyProcess.limit === undefined) Return.limit = (lm) => {return limit(db, actuallyProcess, lm);};
    if(actuallyProcess.order === undefined) Return.order = (column, orderBy = 'ASC') => {return order(db, actuallyProcess, column, orderBy);};

    return Return;
}

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

        select: async () => {
            return await select(db, actuallyProcess);
        }
    };

    if(actuallyProcess.distinct === undefined) Return.distinct = () => {return distinct(db, actuallyProcess);};
    if(actuallyProcess.limit === undefined) Return.limit = (lm) => {return limit(db, actuallyProcess, lm);};
    if(actuallyProcess.order === undefined) Return.order = (column, orderBy = 'ASC') => {return order(db, actuallyProcess, column, orderBy);};

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

        select: async () => {
            return await select(db, actuallyProcess);
        }
    };

    if(actuallyProcess.distinct === undefined) Return.distinct = () => {return distinct(db, actuallyProcess);};
    if(actuallyProcess.limit === undefined) Return.limit = (lm) => {return limit(db, actuallyProcess, lm);};
    if(actuallyProcess.order === undefined) Return.order = (column, orderBy = 'ASC') => {return order(db, actuallyProcess, column, orderBy);};

    return Return;
}

function where(db, actuallyProcess, column, value, operator) {
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

        select: async () => {
            return await select(db, actuallyProcess);
        }
    };

    if(actuallyProcess.distinct === undefined) Return.distinct = () => {return distinct(db, actuallyProcess);};
    if(actuallyProcess.limit === undefined) Return.limit = (lm) => {return limit(db, actuallyProcess, lm);};
    if(actuallyProcess.order === undefined) Return.order = (column, orderBy = 'ASC') => {return order(db, actuallyProcess, column, orderBy);};

    return Return;
}

async function select(db, actuallyProcess) {
    const p = new Promise((resolve, reject) => {
        db.all(compiler(actuallyProcess), (err, rows) => {
            if(err) {
                reject(err)
            } else {
                resolve(rows);
            }
        });
    });

    return await p.then((rows) => rows).catch((err) => {throw new Error(err)});
    
}

module.exports = { select, where, distinct, order, limit };