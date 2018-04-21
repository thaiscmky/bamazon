var Role = require("./bamazonRole");

var Customer = new Role();
Customer.prototype.role = 'customer';
Customer.prototype.cartitem = {};
Customer.prototype.addOption(
    'initAction',
    {
        name: "init",
        type: "rawlist",
        choices: [
            'View Products for Sale',
            'Buy a Product',
            'Exit application'
        ],
        message: "What would you like to do?"
    },
    'chooseAction'
);
Customer.prototype.addOption(
    'buyAction',
    {
        name: "itemId",
        type: "input",
        message: "Which product would you like to buy?",
        validate: function(input){
            //TODO check if item exists in database
            //TODO check if entered value is a number
            return true;
        }
    },
    'getQuantity'
);
Customer.prototype.addOption(
    'buyAction',
    {
        name: "itemQuantity",
        type: "input",
        message: "How much of this product would you like to buy?",
        validate: function(input){
            //TODO check if item exists in database
            //TODO check if entered value is a number
            return true;
        }
    },
    'processPurchase'
);

Customer.prototype.viewProducts = function(){
    this.prototype.connection.query('SELECT * from products', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(fields);
    });
};
Customer.prototype.getItem = function(id){

};
Customer.prototype.getQuantity = function(qty){

};
Customer.prototype.processPurchase = function(){

};