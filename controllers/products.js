const rooDir = require('../util/path');
const path = require('path');

const Product = require('../models/product')


exports.getAddProducts = (req, res, next) => {
    res.status(200).sendFile(path.join(rooDir,"views","app-product.html"))
   
}

exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll()
    res.sendFile(path.join(rooDir,"views","shop.html"))
}