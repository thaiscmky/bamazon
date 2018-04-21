require("dotenv").config();
var mysql = require("mysql");
var csvparse = require("csv-parse");
var fs = require("fs");
var connection =  mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ');
        throw err.stack;
    }
});

var Database = function(){
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
        let sql = `CREATE TABLE IF NOT EXISTS ${this.database}.${tablename}(`;
        columns.forEach(function(column, index){
           if(index < columns.length - 1)
               sql += `${column} ${args[column].join(' ')},`;
           else
               sql += `${column} ${args[column].join(' ')}`;
        });
        sql += `);`;
        connection.query(sql, function (error) {
            if (error) throw error;
            console.log(`Table ${tablename} successfully created.`);
        });

    };
    this.createDatabase = function() {
        let self = this;
        let sql = `CREATE DATABASE IF NOT EXISTS ${self.database};`;
        connection.query(sql, function (error) {
            if (error) throw error;
            console.log(`Database ${self.database} successfully created.`);
            connection.database = self.database;
        });
    };
    this.import = function(filepath, table){
        let self = this;
        fs.readFile(filepath, { encoding: 'utf-8'}, function(err, csvdata) {
            if (err) {
                console.log('Something went wrong while reading your file: '+filepath);
                throw err;
            }

            csvparse(csvdata, { columns: true, delimiter: ',' }, function(err, data) {
                if (err)
                    throw err;
                data.forEach(function(rowObj){
                    let fields = Object.keys(rowObj);
                    let values = Object.values(rowObj).map(function(value){ return Number(value) ? value : `"${value}"`; });
                    let sql = `INSERT INTO ${self.database}.${table}(${fields.join(', ')}) VALUES(${values.join(',')});`;
                    connection.query(sql, function (error) {
                        if (error) throw error;
                    });
                });
            }).on('finish', function(){
                console.log(`Import of ${filepath} complete.`);
            });
        });
    }
};

module.exports = Database;

