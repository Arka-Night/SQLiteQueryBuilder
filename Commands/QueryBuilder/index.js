const fs = require('fs');
const path = require('path');
const { build, drop } = require('./builder');

const CreateConfigFile = require('../../BaseScriptFiles/CreateConfigFile');
const currentDirectory = process.cwd();

module.exports = [
    [
        function init() {
            fs.readdir(currentDirectory, (err, files) => {
                if(err) {
                    console.log(err);
                }
                files.forEach(file => {if(file === 'sqlite-config.json') {throw new Error('You already init the builder here');}});

                fs.appendFile(currentDirectory + '/sqlite-config.json', CreateConfigFile, (err) => {
                    if(err) {
                        console.log(err);
                    }

                    console.log("\x1b[32m%s\x1b[0m", 'Config file is created');
                });

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

            fs.readdir(path.join(configFile.DirectoryHelper, configFile.DBPath), (err, files) => {
                if(err) {
                    throw new Error('The config directory to database is invalid.');
                }

                let dbCreated = false;
                files.forEach(item => {if(item === 'db.sqlite') dbCreated = true;});
            
                if(!dbCreated) {
                    fs.open(path.join(configFile.DirectoryHelper, configFile.DBPath) + '/db.sqlite', 'a', (err) => {
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

            fs.readdir(path.join(configFile.DirectoryHelper, configFile.MigrationsPath), (err, files) => {
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
                    fs.appendFile(path.join(configFile.DirectoryHelper, configFile.MigrationsPath) + `/${tableName}.js`, CreateTable, (err) => {
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

    [
        function upTables() {
            let configFile;
            try{
                configFile = require(currentDirectory + '/sqlite-config.json');
            }catch(err) {
                throw new Error("You doesn't initialize the builder in this folder");
            }
            
            const migrationsPath = path.join(configFile.DirectoryHelper, configFile.MigrationsPath);
            fs.readdir(migrationsPath, (err, files) => {
                if(err) {
                    throw new Error(err);
                }

                files.forEach((file) => {build(require(path.join(migrationsPath, file)), path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite'))});

                console.log("\x1b[32m%s\x1b[0m", 'Tables has update');
            });
        },

        'Up the tables to database',
    ],

    [
        function dropTables() {
            let configFile;
            try{
                configFile = require(currentDirectory + '/sqlite-config.json');
            }catch(err) {
                throw new Error("You doesn't initialize the builder in this folder");
            }
            
            const migrationsPath = path.join(configFile.DirectoryHelper, configFile.MigrationsPath);
            fs.readdir(migrationsPath, (err, files) => {
                if(err) {
                    throw new Error(err);
                }

                if(process.argv[3]) {
                    files.forEach((file) => {
                        if(file === process.argv[3]) {
                            drop(require(path.join(migrationsPath, file)), path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite'));
                            console.log("\x1b[32m%s\x1b[0m", 'Table has dropped');

                        } else {
                            throw new Error('This file doesn\'t exists');

                        }
                    });

                } else {
                    files.forEach((file) => {drop(require(path.join(migrationsPath, file)), path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite'))});
                    console.log("\x1b[32m%s\x1b[0m", 'Tables has dropped');

                }

            });
        },

        "Drop every table in the database if arg doesn't exists, and drop the specified table else",
    ],
];