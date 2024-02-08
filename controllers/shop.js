const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById((prodId, product => {
        res.render('shop/product-detail',{
            product:product,
            pageTitle: product.title,
            path: '/products'
        })
    }))
}


exports.postCart = (req, res, next) => {
    const proId = req.body.productId;
     
    Product.findById(proId, (product) => {
      Cart.addProduct(proId, product.price);
    })
    res.redirect('/cart')
}