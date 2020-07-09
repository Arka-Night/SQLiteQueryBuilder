class Column {
    constructor() {
        this.columns = {
            /* name: {
                type: '',
                nullable: false,
                primary: false,
                autoIncrement: false,
                maxLenght: ,
                foreignKey: {
                    reference: '',
                    on: '',
                    ondelete: '',
                    onupdate: '',
                },
            } */
        };

    }

    string(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'text',
        }
    } 

    int(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'integer',
        }
    }

    real(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'real',
        }
    }

    boolean(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'boolean',
        }
    }

}