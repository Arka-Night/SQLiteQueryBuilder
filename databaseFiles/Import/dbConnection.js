const sqlite = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const Table = require('../Lib/classes');

class Connection {
    constructor(configFile) {
        if(!configFile) {
            throw new Error('No config file parsed');
        }
        this.dbDirectory = path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite');
        fs.readFileSync(this.dbDirectory);
        this.db = new sqlite.Database(this.dbDirectory);
        
    }

    async connectInTable(table) {
        const p = new Promise((resolve, reject) => {
            this.db.run(`SELECT * FROM ${table}`, (err) => {
                if(err) {
                    reject(err);

                } else {
                    const tab = new Table(this.db, table);
                    resolve(tab);
                }
            });
        });

        return await p.then(tab => tab).catch(err => {throw new Error(err);});

    }

    static async connectInTable(table, configFile) {
        const db = new sqlite.Database(path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite'));
        const p = new Promise((resolve, reject) => {
            db.run(`SELECT * FROM ${table}`, (err) => {
                if(err) {
                    reject(err);

                } else {
                    const tab = new Table(db, table);
                    resolve(tab);
                }
            });
        });

        return await p.then(tab => tab).catch(err => {throw new Error(err);});

    }

    async getAllTables() {
        const db = this.db;

        const p = new Promise((resolve, reject) => {
            db.all('SELECT * FROM sqlite_master WHERE type = "table" AND name NOT LIKE "sqlite_%"', (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    const tables = [];
                    rows.forEach((row) => {
                        tables.push(row.name);
                    });
                    resolve(tables);
                }
            });
        });

        return await p.then(tables => tables).catch((err) => {throw new Error(err)});

    }

    static async getAllTables(configFile) {
        const db = new sqlite.Database(path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite'));
        
        const p = new Promise((resolve, reject) => {
            db.all('SELECT * FROM sqlite_master WHERE type = "table" AND name NOT LIKE "sqlite_%"', (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    const tables = [];
                    rows.forEach((row) => {
                        tables.push(row.name);
                    });
                    resolve(tables);
                }
            });
        });

        return await p.then(tables => tables).catch((err) => {throw new Error(err)});

    }

}

module.exports = Connection;