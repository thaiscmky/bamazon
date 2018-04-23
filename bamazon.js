var Customer = require("./model/bamazonCustomer.js");
var userInput = process.argv;
userInput.splice(0,2);
global.customerAction = {};
var customer = new Customer();
startapp();
function startapp() {
    console.log('Welcome to BAmazon, the next best thing in shopping via shell!');
    customer.promptUser('customer',customer.options.initAction[0].prompt, customer.options.initAction[0].callback);
}

global.customerAction.chooseAction = function(answer){
    var msg = Object.values(answer)[0];
    switch(msg.split(' ')[0].toLowerCase()){
        case 'view':
            customer.viewProducts();
            break;
        case 'buy':
            customer.purchaseItem();
            break;
        case 'exit':
            process.exit();
            break;
    }
};

global.customerAction.processPurchase = function(answer){
    customer.setItem(answer.itemId);
    customer.setQuantity(answer.itemQuantity);
    customer.completeTransaction();
    customer.viewProducts();
};