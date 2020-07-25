function compiler(this_actuallyProcess) {
    let sql = `UPDATE ${this_actuallyProcess.table} SET `;

    this_actuallyProcess.columns.forEach((column, index) => {
        sql += `${column.name} = `;
        if(typeof column.value === 'string') {
            sql += `'${column.value}'`;
        } else {
            sql += `${column.value}`;
        }

        if(index+1 === this_actuallyProcess.columns.length) {
            return;
        }

        sql += ', ';
    });

    if(this_actuallyProcess.where !== undefined) {
        sql += ' WHERE ';

        this_actuallyProcess.where.forEach(where => {
            if(where.conditional === 'AND') sql += ' AND ';
            if(where.conditional === 'OR') sql += ' OR ';

            sql += `${where.column} ${where.operator.toUpperCase()} `;
            if(typeof where.value === 'string') {
                if(where.operator === undefined) {
                    sql += `'${where.value}'`;
                } else {
                    if(where.operator.toUpperCase() === 'BETWEEN' || where.operator.toUpperCase() === 'IN' || where.operator.toUpperCase() === 'NOT IN' || where.operator.toUpperCase() === 'NOT BETWEEN') {
                        sql += `${where.value}`;
                    } else {
                        sql += `'${where.value}'`;
                    }
                }
            } else {
                sql += `${where.value}`;
            }
        });
    }

    sql += ';';
    return sql;
}

module.exports = compiler;