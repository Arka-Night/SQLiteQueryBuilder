module.exports = [
    [
        function help() {
            const { helpMap } = require('../cmd');

            console.log("\x1b[32m%s\x1b[0m", 'List of commands: ');
            helpMap.forEach((name, desc) => {
                console.log("\x1b[36m%s\x1b[0m", `   ${desc}: ${name}`);
            });
        },

        "Commands help",
    ],
];