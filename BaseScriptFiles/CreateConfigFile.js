module.exports = `{
    "DBPath": "/",
    "MigrationsPath": "/",
    
    "DirectoryHelper": "${process.cwd().replace(/\\/g, '/')}",
    "DirectoryHelp": "Directory helper maybe be the directory where this config file is located, and the paths in top maybe be relative with this config file"
}`