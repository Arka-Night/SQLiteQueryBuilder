#!/usr/bin/env node
// const exec = require('child_process').exec; TODO: use exec to make some things with command terminal.
const { cmd, stringCommands } = require('../Commands/cmd');
const Connection = require('../databaseFiles/Import/dbConnection');

const connect = new Connection(__dirname + './../debug/database/db.sqlite');

console.log(connect);


if(process.argv[2] !== undefined) {
    const verify = stringCommands.indexOf(process.argv[2]);

    if(verify > -1) {
        Object.entries(cmd).forEach((com) => {
            if(process.argv[2] === com[0]) {
                com[1][0]();
            }
        });
    }else {
        console.log("\x1b[31m%s\x1b[0m", "This command doesn't exists");
    }
} else {
    const { version } = require("../package.json");

    console.log("\x1b[33m%s\x1b[0m", version);
}