const express = require('express');
const path = require('path');
const rooDir = require('../util/path')

const router = express.Router();

router.get('/contactus', (req, res, next) => {
    res.sendFile(path.join(rooDir,"views","contact.html"))
});

router.post('/success', (req, res, next) =>{
    res.redirect('/formsubmited')
})
router.get('/formsubmited', (req, res)=>{
    res.send('<h1 style="text-align:center">Form successfuly filled</h1><h2 style="text-align:center">Thank You!</h2>')
})
module.exports = router;

