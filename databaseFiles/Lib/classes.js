const { selection, insert, deleteColumn, updateColumn } = require('./selectors');

class Table {
    constructor(db, table) {
        this.db = db;
        this.table = table;
        this.actuallyProcess = {
            /* 
            if(select) {
                {
                    columns: [],
                    table: '',
                    order: [
                        {
                            column: '',
                            order: '',
                        }
                    ],
                    where: [
                        {
                            conditional: 'init',
                            column: '',
                            operator: if(null) return '=',
                            value: ''
                        },
                        {
                            conditional: 'and',
                            column: '',
                            operator: if(null) return '=',
                            value: ''
                        }
                    ],
                    distinct: false,
                    limit: 0,
                    offset: 0,
                }
            }
            */
        };

    }

    selection = selection; 
    insert = insert;
    deleteColumn = deleteColumn;
    updateColumn = updateColumn;


}

module.exports = Table;