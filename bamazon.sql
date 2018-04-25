-- customer schema

DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT(11) AUTO_INCREMENT NOT NULL,
item_ID VARCHAR(8) NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(8) NULL,
PRIMARY KEY(id)
);


-- seeds
USE bamazon_DB;

INSERT INTO products(item_ID, product_name, department_name, price, stock_quantity) 
VALUES  ("e04", "AA rechargeable battery", "electronics", 3.99, 120), 
        ("e08", "USB-C cable 2m", "electronics", 12.95, 36),
        ("o02", "wooden pencils 12pk", "office supplies", 8.99, 12),
        ("o23", "wide-ruled notebook 120pg", "office supplies", 1.95, 24),
        ("o12", "printer ink", "office supplies", 1400.05, 22),
        ("e24", "bamazon ice stick", "electronics", 69.95, 17),
        ("h12", "facial tissue 12pk", "household goods", 24.95, 28),
        ("h03", "dish soap 32oz", "household goods", 3.99, 24),
        ("h33", "whisk broom", "household goods", 7.95, 17),
        ("e34", "wireless router", "electronics", 29.95, 13),
        ("e05", "AAA rechargeable battery", "electronics", 2.99, 36),
        ("o07", "astronaut pen", "office supplies", 8.95, 7),
        ("o22", "printer paper 250pg", "office supplies", 12.95, 48),
        ("h18", "water filters", "household goods", 29.95, 9)



