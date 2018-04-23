require("dotenv").config();
var mysql = require("mysql");
var Table = require("cli-table");
var Role = function(role){
  this.role = role;
};

Role.prototype = {
    options: {},
    inventory: [],
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
      var option = {};
      var promptObj = {
          name: args.name,
          type: args.type,
          message: args.message
      };
      if(args.validate) promptObj.validate = args.validate;
      if(args.choices) promptObj.choices = args.choices;
      var promptobj = { prompt: promptObj, callback: callback };
      if(this.options[id]){
          this.options[id].push(promptobj);
      } else {
          option[id] = [promptobj];
          this.options =  Object.assign(this.options, option);
      }
    },
    promptUser: function(user, questions, callback){ //check why you can't use this.role instead...becomes undefined by the next prompt
        this.inquirer.prompt(questions)
        .then(function(answer) {
            global[user+'Action'][callback](answer);
        }).then(Promise.resolve());
    },
    showTable: function(header, rows){
        var table = new Table({
            head: header,
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
        });
        rows.forEach(function(row){
            Role.prototype.inventory.push(Object.values(row));
            table.push(Object.values(row));
        });
        console.log(table.toString());
    }
};
module.exports = Role;