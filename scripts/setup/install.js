var Database = require(__dirname + '/database.js');

var db = new Database();
db.createTable(
    'products',
    {
        item_id: ['INT', 'AUTO_INCREMENT', 'PRIMARY KEY'],
        product_name: ['VARCHAR(100)', 'NOT NULL'],
        department_name: ['VARCHAR(100)'],
        price: ['DECIMAL(10,2)', 'NOT NULL'],
        stock_quantity: ['INT', 'DEFAULT 1']
    }
);
db.createTable(
    'departments',
    {
        department_id: ['INT', 'AUTO_INCREMENT', 'PRIMARY KEY'],
        department_name: ['VARCHAR(100)', 'NOT NULL'],
        over_head_costs: ['DECIMAL(10,2)', 'DEFAULT 0'],
        product_sales: ['DECIMAL(10,2)', 'DEFAULT 0']
    }
);
