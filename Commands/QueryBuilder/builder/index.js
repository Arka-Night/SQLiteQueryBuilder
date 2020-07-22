const sqlite = require('sqlite3').verbose();
const table = require('./table');
const path = require('path');

function build(files, migrationsPath, configFile) {
    const db = new sqlite.Database(path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite'));
    const p = new Promise((resolve, reject) => {
        let error = false;
        files.forEach((file, index) => {
            const { up } = require(path.join(migrationsPath, file));

            db.run(up(table), (err) => {
                if(err) {
                    reject(err);
                    error = true;
                } else {
                    if(index+1 === files.length && !error) {
                        resolve('success');
                    }
                }
            });
        });
    });

    p.then(resolve => {if(resolve === 'success') {console.log("\x1b[32m%s\x1b[0m", 'Tables has update');}}).catch((err) => {throw new Error(err)});

}

function drop(files, migrationsPath, configFile) {
    const db = new sqlite.Database(path.join(configFile.DirectoryHelper, configFile.DBPath, '/db.sqlite'));
    const p = new Promise((resolve, reject) => {
        let error = false;
        files.forEach((file, index) => {
            const { down } = require(path.join(migrationsPath, file));

            if(process.argv[3]) {
                if(process.argv[3] === file) {
                    db.run(down(table), (err) => {
                        if(err) {
                            reject(err);
                            error = true;
                        } else {
                            if(index+1 === files.length && !error) {
                                resolve('success');
                            }
                        }
                    });
                }
            } else {
                db.run(down(table), (err) => {
                    if(err) {
                        reject(err);
                        error = true;
                    } else {
                        if(index+1 === files.length && !error) {
                            resolve('success');
                        }
                    }
                });
            }

        });
    });

    p.then(resolve => {if(resolve === 'success') {console.log("\x1b[32m%s\x1b[0m", 'Tables has dropped');}}).catch((err) => {throw new Error(err)});

}

module.exports = { build, drop };