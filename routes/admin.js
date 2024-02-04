const express = require('express');


const productController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productController.getAddProducts);

router.post('/add-product', productController.postAddProducts);


module.exports = router;