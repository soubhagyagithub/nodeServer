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
    let newQuantity = 1;
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
        
        if (product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product 
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
 exports.postCartDeleteProduct = (req, res, next) => {
    const proId = req.body.productId;
    req.user
    .getCart()
    .then(cart =>{
        return cart.getProduct({where: {id:proId}});

    })
    .then(products =>{
        const product = products[0]
        return product.cartItem.destroy()
    })
    .catch(err => console.log(err))
    Product.findById(proId,product => {
        Cart.deleteProduct(proId, product.price);
    })
 }