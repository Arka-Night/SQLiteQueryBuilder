const { maxLenght, autoIncrement, notNullable, primary, foreignKey } = require('./builderOptions');
const compiler = require('./columnCompiler');

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
                    referenceOn: '',
                    ondelete: '',
                    onupdate: '',
                },
            } */
        };

    }

    getColumns() {
        console.log(this.columns);
    }

    string(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'text',
        }

        const columns = this.columns;

        return {
            maxLenght: (int) => {
                return maxLenght(int, columnName, columns);
            },

            notNullable: () => {
                return notNullable(columnName, columns);
            },

            primary: () => {
                return primary(columnName, columns);
            },

            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config)
            }
        }
    } 

    integer(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'integer',
        }

        const columns = this.columns;

        return {
            autoIncrement: () => {
                return autoIncrement(columnName, columns);
            },

            notNullable: () => {
                return notNullable(columnName, columns);
            },

            primary: () => {
                return primary(columnName, columns);
            },

            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config)
            }
        }
    }

    real(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'real',
        }

        const columns = this.columns;

        return {
            notNullable: () => {
                return notNullable(columnName, columns);
            },

            primary: () => {
                return primary(columnName, columns);
            },

            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config)
            }
        }
    }

    boolean(columnName) {
        if(this.columns[columnName]) {
            throw new Error('Column already exists');
        }

        this.columns[columnName] = {
            type: 'boolean',
        }

        const columns = this.columns;

        return {
            notNullable: () => {
                return notNullable(columnName, columns);
            },

            primary: () => {
                return primary(columnName, columns);
            },

            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config)
            }
        }
    }

}

module.exports = Column;