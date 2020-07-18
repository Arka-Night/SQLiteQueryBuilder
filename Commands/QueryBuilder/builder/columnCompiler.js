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

    return { types, bools: [] };

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

function foreignKeySeparator(columns) {
    const foreigns = {};

    columns.forEach(column => {
        if(column[1].foreignKey !== undefined) {
            foreigns[column[0]] = column[1].foreignKey;
        }
    });

    return { foreigns };
}

function compiler(tableName, this_columns) {
    let sql = `CREATE TABLE ${tableName} (`;
    const columns = Object.entries(this_columns);
    let integerAutoIncrement = false;

    const { types, bools } = typeSeparator(columns);
    const { primarys, isPrimaryOne } = primarySeparator(columns);
    const { autoIncrement } = autoIncrementSeparator(columns);
    const { maxLenght } = maxLenghtSeparator(columns);
    const { nullable } = nullableSeparator(columns);
    const { foreigns } = foreignKeySeparator(columns);

    columns.forEach((column, index) => {
        sql += column[0] + ' ' + types[column[0]];
        if(!nullable[column[0]]) sql += ' NOT NULL';
        if(autoIncrement[column[0]]) { 
            sql += ' PRIMARY KEY AUTOINCREMENT';
            integerAutoIncrement = true;
        };

        if(index+1 === columns.length) {
            return;
        }

        sql += ', '

    });

    if(Object.keys(maxLenght).length > 0 || bools !== null) {
        sql += ', CHECK('

        if(Object.keys(bools).length > 0) {
            bools.forEach((column, index) => {
                sql += `${column} == 0 OR ${column} == 1`;

                if(index+1 === bools.length) {
                    return;
                }
                sql += ' AND ';
            });
        }

        if(Object.keys(maxLenght).length > 0) {
            if(Object.keys(bools).length > 0) {
                sql += ' AND ';
            }

            Object.entries(maxLenght).forEach((column, index) => {
                sql += `length(${column[0]}) <= ${column[1]}`

                if(index+1 === Object.keys(maxLenght).length) {
                    return;
                }
                sql += ' AND ';
            });
        }

        sql += ')';
    }

    if(Object.keys(primarys).length > 0) {
        if(integerAutoIncrement && Object.keys(primarys).length > 1) throw new Error('AutoIncrement need to be the just one primary key!');

        if(!integerAutoIncrement) {
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
    }

    if(Object.keys(foreigns).length > 0) {
        Object.entries(foreigns).forEach(column => {
            sql += `, FOREIGN KEY (${column[0]}) REFERENCES ${column[1].referenceOn}(${column[1].reference})`;

            if(column[1].ondelete) {
                sql += ` ON DELETE ${column[1].ondelete}`;
            } else {
                sql += ` ON DELETE CASCADE`;
            }

            if(column[1].onupdate) {
                sql += ` ON UPDATE ${column[1].onupdate}`;
            } else {
                sql += ` ON UPDATE CASCADE`;
            }
        });
    }

    sql += ');';

    return sql;
}

module.exports = compiler;