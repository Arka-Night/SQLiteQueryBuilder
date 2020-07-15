const Column = require('./column');

const table = {
    createTable(tableName, callback) {
        const columns = new Column();
        callback(columns);


    },

    dropTable(tableName) {
        return `DROP TABLE ${tableName}`;

    },
}

module.exports = table;