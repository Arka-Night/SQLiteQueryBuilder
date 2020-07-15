function typeSeparator(columns) {
    const types = [];
    const bools = [];

    columns.forEach(column => {
        if(column[1].type === 'boolean') {
            types.push('INTEGER');
            bools.push(column[0]);
        }else {
            types.push(column[1].type);
        }
    });

    if(bools) {
        return { types, bools };
    }

    return { types };

}

function nullable(columns) {
    const nullable = [];

    columns.forEach(column => {
        if(column[1].nullable) {
            nullable.push(column[0]);
        }
    });

}

function maxLenghtSeparator(columns) {
    const maxLenght = [];

    columns.forEach(column => {
        if(column[1].maxLenght) {
            maxlen = column[1].maxLenght;
            maxLenght.push({ maxlen, tableName: column[0] });
        }
    });

    return { maxLenght };

}

function autoIncrementSeparator(columns) {
    const autoIncrement = [];

    columns.forEach(column => {
        if(column[1].autoIncrement) {
            autoIncrement.push(column[0]);
        }
    });

    return { autoIncrement }
}

function primarySeparator(columns) {
    const primarys = [];

    columns.forEach(column => {
        if(column[1].primary) {
            primarys.push(column[0]);
        }
    });

    if(primarys.length > 1) {
        return { primary, isPrimaryOne: false };
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

    

}

module.exports = compiler;