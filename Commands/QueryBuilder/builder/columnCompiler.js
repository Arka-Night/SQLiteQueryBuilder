function compiler(tableName) {
    let sql = `CREATE TABLE ${tableName} (`;
    const columns = Object.entries(this.columns);
    let booleans = [];
    let primaryKeyIsMoreThanOne = false;

    let i = 0;
    columns.forEach((column) => {
        if(column[1].primary) {
            i++;
        }
    });
    if(i > 1) {
        primaryKeyIsMoreThanOne = true;
    }

    columns.forEach(column => {
        sql += `${column[0] + ' '}`;

        if(column[1].type === 'boolean') {
            booleans = [...booleans, column[0]];
            sql += 'INTEGER';
        }else {
            sql += column[1].type.toUpperCase();
        }

    });

    console.log(sql);

}

module.exports = compiler;