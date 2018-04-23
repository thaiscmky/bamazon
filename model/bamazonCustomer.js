var Role = require("./bamazonRole");

var Customer = function(){
    Role.call(this, 'customer');
    global.customer = {};
};
Customer.prototype = Role.prototype;
Customer.prototype.cartitem = {};
Customer.prototype.addOption(
    'initAction',
    {
        name: "init",
        type: "list",
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
    }
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
    Customer.prototype.connection.query('SELECT * from products', function (error, results, fields) {
        if (error) throw error;
        Customer.prototype.showTable(
           ['ID', 'Name', 'Category', 'Price', 'In Stock'], results
        );
        Customer.prototype.promptUser('customer',Customer.prototype.options.initAction[0].prompt, Customer.prototype.options.initAction[0].callback);
    });
};
Customer.prototype.purchaseItem = function(){
    Customer.prototype.promptUser(
        'customer',
        Customer.prototype.options.buyAction.map(function(value){
            return value.prompt;
        })
        , Customer.prototype.options.buyAction[1].callback); //TODO remove harcoded length
};
Customer.prototype.setItem = function(id){
    Customer.prototype.itemId = id;
};
Customer.prototype.setQuantity = function(qty){
    Customer.prototype.qty = qty;
};

Customer.prototype.completeTransaction = function() {
    Customer.prototype.connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? and stock_quantity >= ?',
        [this.qty, this.itemId, this.qty],
        function (error, results, fields) {
            if (error) throw error;
            if(results.changedRows)
                console.log(`Successfully purchased ${Customer.prototype.qty} of ${Customer.prototype.inventory[Customer.prototype.itemId - 1][1]}.`);
            else
                console.log('Sorry. You have entered an item that doesn\'t exist, or is out of stock. Please try again.');
        });
};

module.exports = Customer;