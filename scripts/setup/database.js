var mysql = require("mysql");
var Database = function(){
    this.host = process.env.DB_HOST;
    this.user = process.env.DB_USER;
    this.password = process.env.DB_PASSWORD;
    this.database = process.env.DB_NAME;
    this.installSchema = function (tables) {
        let self = this;
        self.createDatabase();
        tables.forEach(function(tableObj){
            self.createTable(tableObj.name, tableObj.columns) ;
        });
    };
    /***
     * Creates a table with columns based on the object key and property values
     * @param string tablename
     * @param object args
     * @return void
     */
    this.createTable = function(tablename, args) {
        let columns = Object.keys(args);
        let sql = `CREATE TABLE ${tablename}(`;
        columns.forEach(function(column, index){
           if(index < args.length - 1)
               sql += `${column} ${args[column].join(' ')},`;
           else
               sql += `${column} ${args[column].join(' ')}`;
        });
        sql += `);`;

    };
    this.createDatabase = function() {
        let sql = `CREATE DATABASE IF NOT EXISTS ${this.database};`;
    }
};

module.exports = Database;

