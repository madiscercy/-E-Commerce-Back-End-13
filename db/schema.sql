DROP DATABASE IF EXISTS ecommerce_db;

CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE categories (
    id INTEGER AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 10,
    category_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE tags (
    id INTEGER AUTO_INCREMENT NOT NULL,
    tag_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE product_tags (
    id INTEGER AUTO_INCREMENT NOT NULL,
    product_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
