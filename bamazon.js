var Customer = require("./model/bamazonCustomer.js");
var userInput = process.argv;
userInput.splice(0,2);
var customer = new Customer();

startapp();
function startapp() {
    console.log('Welcome to BAmazon, the next best thing in shopping via shell!');
    customer.promptUser(customer.options.initAction[0].prompt, customer.options.initAction[0].callback);
}

global.customer.chooseAction = function(answer){
    var msg = Object.values(answer)[0];
    switch(msg.split(' ')[0].toLowerCase()){
        case 'view':
            //display all products
            break;
        case 'buy':
            //start buying process
            break;
        case 'exit':
            //exit application process
            break;
    }
};