var Role = {};
Role.prototype.inquirer = require("inquirer");
Role.prototype.role = '';
Role.prototype.options = [];
Role.prototype.getOptions = function(){
  return this.options;
};
Role.prototype.addOption = function(args, callback){
  var promptObj = {
      name: args.name,
      type: args.type,
      message: args.message
  };
  if(args.validate) promptObj.validate = args.validate;
  if(args.choices) promptObj.choices = args.choices;
  this.options.push({prompt: promptObj, callback: callback});
};
Role.prototype.promptUser = function(questions, callback){
    this.inquirer.prompt(questions)
        .then(function(answer) {
            callback.call(this);
        });
};

module.exports = Role;