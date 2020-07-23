function compiler(this_actuallyProcess) {
    let sql = 'SELECT ';

    if(this_actuallyProcess.distinct) {
        sql += 'DISTINCT ';
    }

    sql += `${this_actuallyProcess.columns.join(', ')} FROM ${this_actuallyProcess.table}`;

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

    if(this_actuallyProcess.order !== undefined) {
        sql += ' ORDER BY ';

        this_actuallyProcess.order.forEach((order, index) => {
            sql += `${order.column} ${order.order.toUpperCase()}`;

            if(index+1 !== this_actuallyProcess.order.length) {
                sql += ', ';
            }
        });
    }

    if(this_actuallyProcess.limit !== undefined) {
        sql += ` LIMIT ${this_actuallyProcess.limit}`;
        if(this_actuallyProcess.offset !== undefined) sql += ` OFFSET ${this_actuallyProcess.offset}`;
    }

    sql += ';';
    return sql;
}

module.exports = compiler;