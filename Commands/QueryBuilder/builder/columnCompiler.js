const Column = require("./column");

function typeSeparator(columns) {
    const types = {};
    const bools = [];

    columns.forEach(column => {
        if(column[1].type === 'boolean') {
            types[column[0]] = 'INTEGER';
            bools.push(column[0]);
        }else {
            types[column[0]] = column[1].type.toUpperCase();
        }
    });

    if(bools) {
        return { types, bools };
    }

    return { types, bools: null };

}

function nullableSeparator(columns) {
    const nullable = {};

    columns.forEach(column => {
        if(!column[1].nullable && column[1].nullable !== undefined) {
            nullable[column[0]] = false;
        } else {
            nullable[column[0]] = true;
        }
    });

    return { nullable };

}

function maxLenghtSeparator(columns) {
    const maxLenght = {};

    columns.forEach(column => {
        if(column[1].maxLenght) {
            maxLenght[column[0]] = column[1].maxLenght;
        }
    });

    return { maxLenght };

}

function autoIncrementSeparator(columns) {
    const autoIncrement = {};

    columns.forEach(column => {
        if(column[1].autoIncrement) {
            autoIncrement[column[0]] = true;
        }
    });

    return { autoIncrement }
}

function primarySeparator(columns) {
    const primarys = {};

    columns.forEach(column => {
        if(column[1].primary) {
            primarys[column[0]] = column[0];
        }
    });

    if(Object.keys(primarys).length > 1) {
        return { primarys, isPrimaryOne: false };
    }

    return { primarys, isPrimaryOne: true };

}

function compiler(tableName) {
    let sql = `CREATE TABLE ${tableName} (`;
    const columns = Object.entries(this.columns);

    const { types, bools } = typeSeparator(columns);
    const { primarys, isPrimaryOne } = primarySeparator(columns);
    const { autoIncrement } = autoIncrementSeparator(columns);
    const { maxLenght } = maxLenghtSeparator(columns);
    const { nullable } = nullableSeparator(columns);

    columns.forEach((column, index) => {
        sql += column[0] + ' ' + types[column[0]];
        if(!nullable[column[0]]) sql += ' NOT NULL';
        if(autoIncrement[column[0]]) sql += ' AUTOINCREMENT';

        if(index+1 === columns.length) {
            return;
        }

        sql += ', '

    });

    if(Object.keys(maxLenght).length > 0 || bools !== null) {
        sql += ', CHECK('

        //TODO: maxLenght and bools

        sql += ')';
    }

    if(Object.keys(primarys).length > 0) {
        if(isPrimaryOne) {
            sql += `, PRIMARY KEY (${Object.entries(primarys).map(column => column[1])})`;
        }else {
            sql += ', PRIMARY KEY (';
            Object.entries(primarys).forEach((column, index) => {
                sql += `${column[0]}`;

                if(index+1 === Object.keys(primarys).length) {
                    return;
                }
                sql += ', ';
            });
            sql += ')';
        }
    }

    sql += ');';

    console.log(sql);
}

module.exports = compiler;