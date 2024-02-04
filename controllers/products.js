const rooDir = require('../util/path');
const path = require('path');

exports.getAddProducts = (req, res, next) => {
    res.status(200).sendFile(path.join(rooDir,"views","app-product.html"))
   
}

exports.postAddProducts = (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.sendFile(path.join(rooDir,"views","shop.html"))
}