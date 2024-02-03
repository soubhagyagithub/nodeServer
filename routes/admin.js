const express = require('express');
const path = require('path');
const rooDir = require('../util/path')
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.status(200).sendFile(path.join(rooDir,"views","app-product.html"))
   
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})


module.exports = router;