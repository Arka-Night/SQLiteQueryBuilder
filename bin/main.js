// const exec = require('child_process').exec; TODO: use exec to make some things with command terminal.
const fs = require('fs');

const CreateTable = require('../BaseScriptFiles/CreateTable.js');
const currentDirectory = process.cwd();

let configFile;
try {   
    configFile = require(process.cwd() + '/sqlite-config.json');

} catch(err) {
    throw new Error('no config file to query builder!');

}

fs.readdir(currentDirectory + configFile.MigrationsPath, (err, files) => {
    if(err) {
        throw new Error('The config directory to migrations is invalid.');
    }

    let isCreated = false;
    let dbCreated = false;
    files.forEach(item => {if(item === 'CreateTable.js') isCreated = true; if(item === 'db.sqlite') dbCreated = true;});

    if(!isCreated) {
        fs.appendFile(currentDirectory + configFile.MigrationsPath + '/CreateTable.js', CreateTable, (err) => {
            if(err) {
                console.log(err);
            }

            console.log('Table created.');
        });
    }

    if(!dbCreated) {
        fs.open(currentDirectory + configFile.DBPath + '/db.sqlite', 'a', (err) => {
            if(err) {
                console.log(err);
            }

            console.log('Database created.');
        });
    }
});

console.log(configFile);