function maxLenght(int, columnName, columns) {
    column = columns[columnName];
    columns[columnName].maxLenght = int;

    return {
        notNullable: () => {
            return notNullable(columnName, columns);
        },
        primary: () => {
            return primary(columnName, columns);
        },
        foreignKey: (col, reference, config) => {
            return foreignKey(columnName, columns, col, reference, config);
        }
    }
}

function autoIncrement(columnName, columns) {
    column = columns[columnName];
    columns[columnName].autoIncrement = true;

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
            return foreignKey(columnName, columns, col, reference, config);
        }
    }
}

function notNullable(columnName, columns) {
    column = columns[columnName];
    columns[columnName].nullable = false;

    if(columns[columnName].type === 'integer') {
        return {
            autoIncrement: () => {
                return autoIncrement(columnName, columns);
            },
            primary: () => {
                return primary(columnName, columns);
            },
            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config);
            }
        }

    } else if(columns[columnName].type === 'text') {
        return {
            maxLenght: (int) => {
                return maxLenght(int, columnName, columns);
            },
            primary: () => {
                return primary(columnName, columns);
            },
            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config);
            }
        }
    } else {
        return {
            primary: () => {
                return primary(columnName, columns);
            },
            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config);
            }
        }
    }
}

function primary(columnName, columns) {
    column = columns[columnName];
    columns[columnName].primary = true;


    if(columns[columnName].type === 'integer') {
        return {
            maxLenght: (int) => {
                return maxLenght(int, columnName, columns);
            },
            autoIncrement: () => {
                return autoIncrement(columnName, columns);
            },
            notNullable: () => {
                return notNullable(columnName, columns);
            },
            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config);
            }
        }
    
    } else if(columns[columnName].type === 'text'){
        return {
            maxLenght: (int) => {
                return maxLenght(int, columnName, columns);
            },
            notNullable: () => {
                return notNullable(columnName, columns);
            },
            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config);
            }
        }
    } else {
        return {
            notNullable: () => {
                return notNullable(columnName, columns);
            },
            foreignKey: (col, reference, config) => {
                return foreignKey(columnName, columns, col, reference, config);
            }
        }
    }
}

function foreignKey(columnName, columns, col, reference, config = null) {
    column = columns[columnName];
    columns[columnName].foreignKey = {};
    columns[columnName].foreignKey.reference = reference;
    columns[columnName].foreignKey.referenceOn = col;

    if(config) {
        if(config.ondelete) {
            switch(config.ondelete.toLowerCase()) {
                case 'cascade': 
                    columns[columnName].foreignKey.ondelete = config.ondelete;
                    break;
                
                case 'set null': 
                    columns[columnName].foreignKey.ondelete = config.ondelete;
                    break;
                
                case 'set default':
                    columns[columnName].foreignKey.ondelete = config.ondelete;
                    break;

                case 'restrict':
                    columns[columnName].foreignKey.ondelete = config.ondelete;
                    break;

                case 'no action':
                    columns[columnName].foreignKey.ondelete = config.ondelete;
                    break;

                default: 
                    throw new Error('Invalid ondelete value');
            }
        } else {
            columns[columnName].foreignKey.ondelete = 'CASCADE';
        }

        if(config.onupdate) {
            switch(config.onupdate.toLowerCase()) {
                case 'cascade': 
                    columns[columnName].foreignKey.onupdate = config.onupdate;
                    break;
                
                case 'set null': 
                    columns[columnName].foreignKey.onupdate = config.onupdate;
                    break;
                
                case 'set default':
                    columns[columnName].foreignKey.onupdate = config.onupdate;
                    break;

                case 'restrict':
                    columns[columnName].foreignKey.onupdate = config.onupdate;
                    break;

                case 'no action':
                    columns[columnName].foreignKey.onupdate = config.onupdate;
                    break;

                default: 
                    throw new Error('Invalid onupdate value');
            }
        } else {
            columns[columnName].foreignKey.onupdate = 'CASCADE';
        }
    } else {
        columns[columnName].foreignKey.ondelete = 'CASCADE';
        columns[columnName].foreignKey.onupdate = 'CASCADE';
    }

    if(columns[columnName].type === 'integer') {
        return {
            maxLenght: (int) => {
                return maxLenght(int, columnName, columns);
            },
            autoIncrement: () => {
                return autoIncrement(columnName, columns);
            },
            notNullable: () => {
                return notNullable(columnName, columns);
            },
            primary: () => {
                return primary(columnName, columns);
            }
        }

    } else if(columns[columnName].type === 'text'){
        return {
            maxLenght: (int) => {
                return maxLenght(int, columnName, columns);
            },
            notNullable: () => {
                return notNullable(columnName, columns);
            },
            primary: () => {
                return primary(columnName, columns);
            }
        }

    } else {
        return {
            notNullable: () => {
                return notNullable(columnName, columns);
            },
            primary: () => {
                return primary(columnName, columns);
            }
        }
    }
}

module.exports = {
    maxLenght,
    autoIncrement,
    notNullable,
    primary,
    foreignKey
}