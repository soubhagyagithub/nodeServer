
const db = require('../util/database');

module.exports = class Product {
    constructor(id, title, price, description, imageUrl) {
        this.id = id;
        this.title = title;
        this.price =price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        return db.execute('INSERT INTO products(title, price, description, imageUrl) VALUES( ?, ?, ?, ?)',
        [this.title, this.price, this.description, this.imageUrl]
        );
     
    }
    static updateById(id, title, price, description, imageUrl) {
        return db.execute('UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
            [title, price, description, imageUrl, id]
        );
    }

    static fetchAll() {
       return db.execute('SELECT * FROM products') ;
    }
    static findById(id){
       return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    }
    static deleteById(id){
       return db.execute('DELETE FROM products WHERE products.id = ?',[id])
    }
};
