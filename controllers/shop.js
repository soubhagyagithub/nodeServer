const Product = require('../models/product');
const Cart = require('../models/cart');
const { decrypt } = require('dotenv');

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

exports.getIndex = (req, res, next) => {
    
    Product.fetchAll()
    .then((result) => {
     console.log(result);
    })
    .catch((err) => {
    console.log(err);
    })
}


exports.postCart = (req, res, next) => {
    const proId = req.body.productId;
    let fetchCart; 
    req.user
    .getCart()
    .then(cart => {
        fetchCart = cart;
        return cart.getProduct({where: {id: proId}});
    })
    .then(products =>{
        let product;
        if (products.length > 0){
            product = products[0]
        }
        let newQuantity = 1;
        if (product){
            //...
        }
        return Product.findById(proId)
        .then(product => {
            return fetchCart.addProduct(product, {through: { quantity: newQuantity}})
        })
    } )
    .catch(err => console.log(err))
}


exports.getCart = (req, res, next) => {
    console.log(req.user.cart);
    req.user
    .getCart()
    .then(cart => {
        return cart.getProduct(); 
    })
    .catch(err => console.log(err))

}