const express = require('express');
const productController = require('../controllers/products');
const shoController = require('../controllers/shop');


const router = express.Router();

router.get('/', productController.getProducts );

router.get('/products/:productId', shoController.getProduct);

module.exports = router;