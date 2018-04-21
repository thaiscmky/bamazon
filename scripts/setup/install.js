var Database = require(__dirname + '/database.js');

var db = new Database();
console.log('Creating database schema...');
db.installSchema(
    [{
        name: 'products',
        columns: {
            item_id: ['INT', 'AUTO_INCREMENT', 'PRIMARY KEY'],
            product_name: ['VARCHAR(100)', 'NOT NULL'],
            department_name: ['VARCHAR(100)'],
            price: ['DECIMAL(10,2)', 'NOT NULL'],
            stock_quantity: ['INT', 'DEFAULT 1']
        }
    },
    {
        name: 'departments',
        columns: {
            department_id: ['INT', 'AUTO_INCREMENT', 'PRIMARY KEY'],
            department_name: ['VARCHAR(100)', 'NOT NULL'],
            over_head_costs: ['DECIMAL(10,2)', 'DEFAULT 0'],
            product_sales: ['DECIMAL(10,2)', 'DEFAULT 0']
        }
    }]
);

console.log('Adding sample data...');
db.import(__dirname + '/data/initialprods.csv', 'products');
db.import(__dirname + '/data/initialdepartments.csv', 'departments');
process.exit();
