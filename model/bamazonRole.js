require("dotenv").config();
var mysql = require("mysql");
var Role = function(){};

Role.prototype = {
    role: null,
    options: [],
    inquirer: require("inquirer"),
    connection: mysql.createConnection({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }),
    getOptions: function(){
        return this.options;
    },
    addOption: function(id, args, callback){
        var promptObj = {
            name: args.name,
            type: args.type,
            message: args.message
        };
        if(args.validate) promptObj.validate = args.validate;
        if(args.choices) promptObj.choices = args.choices;
        this.options.push( {id: { prompt: promptObj, callback: callback} });
    },
    promptUser: function(questions, callback){
        this.inquirer.prompt(questions)
            .then(function(answer) {
                callback.call(this);
            });
    }
};
module.exports = Role;