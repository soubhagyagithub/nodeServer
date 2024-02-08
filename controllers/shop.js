const Product = require('../models/product');

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