const { select, insert } = require('./selectors.js');

class Table {
    constructor(db, table) {
        this.db = db;
        this.table = table;
        this.select = select;
        this.insert = insert;
    }

}

module.exports = Table;