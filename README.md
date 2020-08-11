# sqlite-qb: a sqlite3 query builder
Install globally to use the builder, and locally to use the database package.

GitHub repository: https://github.com/Arka-Night/SQLiteQueryBuilder

Author: Elon Pereira Neto - Vulgo ArkaNight

- [Setup](#setup)
- [Builder reference](#builder-reference)
- [Package reference](#package-reference)

### Basic usage of package: 

with promise format:
```javascript
const Connection = require('sqlite-qb');
const configFile = require('sqlite-config.json');

const connection = new Connection(configFile);
connection.connectInTable('table').then(tab  => {
	tab.selection('*').select().then(rows  => {
		console.log(rows);
	});
});
```

with async await:
```javascript
async function func() {
	const Connection = require('sqlite-qb');
	const configFile = require('sqlite-config.json');

	const connection = new Connection(configFile);
	const table = await connection.connectInTable('table');
	
	console.log(await table.selection('*').select());
}
```

# Setup
__You can setup the builder and the lib with npm and yarn__
- Install globally: ``npm install -g sqlite-qb`` or ``yarn global add sqlite-qb``
- Install package: ``npm install sqlite-qb`` or ``yarn add sqlite-qb``

# Builder reference:
- [init](#init)
- [createDB](#createdb)
- [createMigration](#createmigration)
- [upTables](#uptables)
- [dropTables](#droptables)
- [Table construction](#table-construction)
#
__The binary to builder is ``sqb``__

- ``sqb`` command will show the version of builder

### Init:
Init the builder and the config json file in the directory that you called the command.
command: ``sqb init``
### createDB:
Create the database file in the specified directory in config json.
command: ``sqb createDB``
### createMigration:
Create a migration in specified folder in config json. (the command needs to receive a migration name)
in the exit file, the next code will be writen:
```javascript
export.up = (table) => {
	return table.createTable(tableName, callback);
}

export.down = (table) => {
	return table.dropTable(tableName);
}
```
command: ``sqb createMigration [name]``
### upTables:
Up all migrations in specified folder in config json to database file.
command: ``sqb upTables``
### dropTables: 
Drop all tables in specified folder in config json if a migration file name isn't specified and drop the migration specified if it is specified. (the command can receive a second parameter)
command: ``sqb dropTables [?migrationName]``
## Table construction:
The __table__ comes in up and down callback function of migrations (see how to create then in [createMigration](#createmigration)):
```javascript
export.up = (table) => {
	return table.createTable(tableName, callback);
}

export.down = (table) => {
	return table.dropTable(tableName);
}
```

- [Table](#table)
	
	- createTable
	- dropTable

- [Column](#column)
#

### Table:
__table__ is the parameter of up and down callback function of migrations and it have two methods:
- #### createTable(tableName, callback([column](#column))):
  this method returns a sql format of the table construction callback and needs to be returned in up callback function of migrations.
- #### dropTable(tableName):
  this method return a sql format of drop of the table specified in parameter and needs to be returned in down callback function of migrations.
### Column: 
__column__ is the table.createTable callback parameter, used to create the columns on the table.

the [methods](#column-methods) of him are:

- [string](#string)

	- [maxLenght](#maxlenght)
	- [notNullable](#notnullable)
	- [foreignKey](#foreignkey)
	- [primary](#primary)
- [integer](#integer)

	- [autoIncrement](#autoincrement)
	- [notNullable](#notnullable)
	- [foreignKey](#foreignkey)
	- [primary](#primary)
- [real](#real)

	- [notNullable](#notnullable)
	- [foreignKey](#foreignkey)
	- [primary](#primary)
- [boolean](#boolean)

	- [notNullable](#notnullable)
	- [foreignKey](#foreignkey)
	- [primary](#primary)
#
### Column Methods:
#### string:
uses: ``column.string(columnName)``
this method create a string type column with the specified name in parameter.
#### integer:
uses: ``column.integer(columnName)`` 
this method create a integer type column with the specified name in parameter.
#### real:
uses: ``column.real(columnName)``
this method create a real number type column with the specified name in parameter.
#### boolean:
uses ``column.boolean(columnName)``
this method create a boolean type column with the specified name in parameter.
the receive is 1 and 0.
the return is 1 and 0.
(integer format)

### Methods of Column Methods:
#### maxLenght:
__Only in string type__
uses: ``column.string(columnName).maxLenght(lenghtNumber)``
this method put a max lenght in string column.
#### autoIncrement:
__Only in integer type__
uses: ``column.interger(columnName).autoIncrement(no args)``
this method create a auto increment sqlite column.
#### notNullable:
__Available in every column type__
uses: ``column.'type'(columnName).notNullable(no args)``
this method create a column that not be can nullable.
#### primary:
__Available in every column type__
uses: ``column.'type'(columnName).primary(no args)``
this method create a primary sqlite column.
(Can be used in every column in table if you want to create a multiple primary column).
#### foreignKey:
__Available in every column type__
uses: 
```javascript
column.'type'(columnName).foreignKey(
column(column of reference that you are referencing), 
reference(table that you are referencing), config: {
	ondelete: 'cascade for default',
	onupdate: 'cascade for default'
})
```
# Package reference:
- [Basic usage](#basic-usage)
- [Connection class](#connection-class)
- [Table class](#table-class)

## Basic usage:
with promise format:
```javascript
const Connection = require('sqlite-qb');
const configFile = require('sqlite-config.json');

const connection = new Connection(configFile);
connection.connectInTable('table').then(tab  => {
	tab.selection('*').select().then(rows  => {
		console.log(rows);
	});
});
```

with async await:
```javascript
async function func() {
	const Connection = require('sqlite-qb');
	const configFile = require('sqlite-config.json');

	const connection = new Connection(configFile);
	const table = await connection.connectInTable('table');
	
	console.log(await table.selection('*').select());
}
```
in package, if you dont need a return, you can just use the function without promise format or async await.
## Connection class:
```javascript 
const Connection = require('sqlite-qb');
const connection = new Connection(json-config);
``` 
(every method in that class are static(except ``closeDb()``), but can be used with constructor)

### Methods: 
- [connectInTable](#connectintable)
- [getAllTables](#getalltables)
- [closeDb](#closedb)
##
#### connectInTable:
This method returns [table](#table-class) class with a single connection in one table in the database connected.
uses: 
```javascript 
/Constructor version/
const table = await connection.connectInTable(tableName); //returns table class
/or/
connection.connectInTable(tableName).then(table); //returns table class

/Static version/
const table = await Connection.connectInTable(tableName, json-config); //returns table class
/or/
connection.connectInTable(tableName, json-config).then(table); //returns table class
```
#### getAllTables:
This method returns a array with all tables in database connected.
uses:
```javascript
/Constructor version/
const tables = await connection.getAllTables(); // returns array with all tables
/or/
connection.getAllTables().then(tables); // returns array with all tables

/Static version/
const tables = await Connection.getAllTables(json-config); // returns array with all tables
/or/
Connection.getAllTables(json-config).then(tables); // returns array with all tables
```
#### closeDb:
This method close the database connected(constructor version only).
uses:
```javascript
connection.closeDb();
```
## Table class:
```javascript
const tab = await connection.connectInTable(tableName);
/or/
connection.connectInTable(tableName).then(tab);
```
(static version in [connection class reference](#connection-class) on [connectInTable](#connectintable))

### Methods: 
- [selection](#selection)
	- [where](#where)
	- [distinct](#distinct)
	- [order](#order)
	- [limit](#limit)
	- [select](#select)
- [insert](#insert)
- [deleteColumn](#deletecolumn)
	- [where](#where)
	- [del](#del)
- [updateColumn](#updatecolumn)
	- [where](#where)
	- [update](#update)

### SubMethods:
- [where](#where)
- [andWhere](#andwhere)
- [orWhere](#orwhere)
- [distinct](#distinct)
- [order](#order)
- [limit](#limit)
	- offset
- [select](#select)
- [del](#del)
- [update](#update)

##
### Methods: 
#### __Selection__: 
this method initiate a column selection on the table that you called and need to be finalized with [select](#select) submethod.
Uses: `` table.selection(...data)``
SubMethods: [where](#where), [distinct](#distinct), [order](#order), [limit](#limit), [select](#select)
#### __Insert__:
this method insert a value in columns of the table that you called.
Uses: ``table.insert(insert_data = { column: value })``
 SubMethods: none.
 #### __deleteColumn__:
 this method initiate a column delete on the table that you called and need to be finalized with [del](#del) submethod.
 Uses: ``table.deleteColumn()``
 SubMethods: [where](#where), [del](#del)
 #### __updateColumn__:
 this method initiate a column update on the table that you called and need to be finalized with [update](#update) submethod.
 Uses: ``table.updateColumn(config: { column: value })``
 SubMethods: [where](#where), [update](#update)
 
 ### SubMethods:
 #### __where__:
this submethod is used to specify a column that you want to acess.
can be used with any method and return 2 submethods: [andWhere](#andwhere), [orWhere](#orwhere) (return the anothers submethod of the method too)
Uses: ``table.method().where(column, value, [operation = '='])``
#### __andWhere__:
this submethod is used to specify a column that you want to acess and put an and logical operator in the where operation.
can be used with any method and return 2 submethods: [andWhere](#andwhere), [orWhere](#orwhere) (return the anothers submethod of the method too)
similar with [where](#where).
#### __orWhere__:
this submethod is used to specify a column that you want to acess and put an or logical operator in the where operation.
can be used with any method and return 2 submethods: [andWhere](#andwhere), [orWhere](#orwhere) (return the anothers submethod of the method too)
use is similar with [where](#where).
#### __distinct__:
this submethod is used to take a distinct column, and the distinct column is the first column in the selection method parameter.
can be used just with selection method and return the anothers submethod of selection method.
Uses: ``table.method().distinct()``
#### __order__:
this submethod is used to put a specified column in a order(descend or ascend).
can be used just with selection method and return the anothers submethod of selection method and another order submethod.
Uses: ``table.selection().order(column, 'asc' or 'desc')``
#### __limit__:
this submethod is used to put a limit in the select method return.
can be used just with selection method and return the anothers submethod of selection method and offset submethod.
Uses: ``table.selection().limit(limit)``
__Offset submethod:__
this submethod is used to put a offset in limit of the select method return.
can be used just with selection method after limit submethod and return the anothers submethod of selection method.
Uses: ``table.selection().limit(limit).offset(offset)``
#### __select__:
this submethod is used to finalize the selection and return the columns.
can be used just with selection method and return the columns.
Uses: ``table.selection().select()``
#### __del__:
this submethod is used to finalize the delete and return 1 if with sucess and error if without sucess.
can be used just with deleteColumn method.
Uses: ``table.deleteColumn().del()``
#### __update__:
this submethod is used to finalize the update and return 1 if with sucess and error if without sucess.
can be used just with updateColumn method.
Uses: ``table.updateColumn().update()``