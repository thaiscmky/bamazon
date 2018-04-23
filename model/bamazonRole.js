require("dotenv").config();
var mysql = require("mysql");
var Role = function(role){
  this.role = role;
};

Role.prototype = {
    options: {},
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
    promptUser: function(questions, callback){
        var self = this;
        this.inquirer.prompt(questions)
            .then(function(answer) {
                global[self.role][callback](answer);
            });
    }
};
module.exports = Role;