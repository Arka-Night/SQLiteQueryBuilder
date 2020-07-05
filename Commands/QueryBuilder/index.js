const fs = require('fs');

const CreateConfigFile = require('../../BaseScriptFiles/CreateConfigFile');
const currentDirectory = process.cwd();

module.exports = [
    [
        function init() {
            fs.readdir(currentDirectory, (err, files) => {
                if(err) {
                    console.log(err);
                }
                files.forEach(file => {if(file === 'sqlite-config.json') {throw new Error('You already init the builder here');}})

                fs.appendFile(currentDirectory + '/sqlite-config.json', CreateConfigFile, (err) => {
                    if(err) {
                        console.log(err);
                    }

                    console.log("\x1b[32m%s\x1b[0m", 'Config file is created');
                })

            });
        },

        'Initialize the config file "sqlite-config.json" in the directory',
    ],

    [
        function createDB() {
            let configFile;
            try{
                configFile = require(currentDirectory + '/sqlite-config.json');
            }catch(err) {
                throw new Error("You doesn't initialize the builder in this folder");
            }

            fs.readdir(currentDirectory + configFile.DBPath, (err, files) => {
                if(err) {
                    throw new Error('The config directory to migrations is invalid.');
                }

                let dbCreated = false;
                files.forEach(item => {if(item === 'db.sqlite') dbCreated = true;});
            
                if(!dbCreated) {
                    fs.open(currentDirectory + configFile.DBPath + '/db.sqlite', 'a', (err) => {
                        if(err) {
                            console.log(err);
                        }
            
                        console.log("\x1b[32m%s\x1b[0m", 'Database created.');
                    });
                }
            });
        },

        "Create the database file in the specified directory in config file",
    ],

    [
        function createMigration() {
            let configFile;
            const CreateTable = require('../../BaseScriptFiles/CreateTable');

            try{
                configFile = require(currentDirectory + '/sqlite-config.json');
            }catch(err) {
                throw new Error("You doesn't initialize the builder in this folder");
            }

            fs.readdir(currentDirectory + configFile.MigrationsPath, (err, files) => {
                if(err) {
                    throw new Error('The config directory to migrations is invalid.');
                }

                if(process.argv[3] === undefined) {
                    console.log("\x1b[31m%s\x1b[0m", 'Please specify the name of the migration');
                    return;
                }

                const tableName = process.argv[3];
                let isCreated = false;
                files.forEach(item => {if(item === tableName) isCreated = true;});
            
                if(!isCreated) {
                    fs.appendFile(currentDirectory + configFile.MigrationsPath + `/${tableName}.js`, CreateTable, (err) => {
                        if(err) {
                            console.log(err);
                        }
            
                        console.log("\x1b[32m%s\x1b[0m", 'Migration created.');
                    });
                }
            });
        },

        "Initialize a migration in specified directory in config file",
    ],
];