const QueryBuilder = require('./QueryBuilder');
const util = require('./util');

const stringCommands = [];
const helpMap = new Map();
let cmd = {};

QueryBuilder.forEach(item => {
    const funcName = item[0].name;
    cmd[funcName] = [item[0], item[1]];
});

util.forEach(item => {
    const funcName = item[0].name;
    cmd[funcName] = [item[0], item[1]];
});

Object.entries(cmd).forEach(entry => {
    stringCommands.push(entry[0]);
    helpMap.set(entry[0], entry[1][1]); 
});


module.exports = { cmd, stringCommands, helpMap };