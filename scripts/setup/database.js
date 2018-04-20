var mysql = require("mysql");
var Database = function(){
    this.host = process.env.DB_HOST;
    this.user = process.env.DB_USER;
    this.password = process.env.DB_PASSWORD;
    this.database = process.env.DB_NAME;
    this.installSchema = function () {
        this.createDatabase();
        this.createTable();
    };
    this.createTable = function() {

    };
    this.createDatabase = function() {

    }
};