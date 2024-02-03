const express = require('express');
const path = require('path');
const rooDir = require('../util/path')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rooDir,"views","shop.html"))
});

module.exports = router;