const Column = require('./column');
const compiler = require('./columnCompiler');

const table = {
    createTable(tableName, callback) {
        const columns = new Column();
        callback(columns);
        return compiler(tableName, columns.columns);

    },

    dropTable(tableName) {
        return `DROP TABLE ${tableName}`;

    },
}

module.exports = table;