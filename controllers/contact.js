const path = require('path');
const rooDir = require('../util/path');

exports.getContact =  (req, res, next) => {
    res.sendFile(path.join(rooDir,"views","contact.html"))
}

exports.postContact = (req, res, next) =>{
    res.redirect('/formsubmited')
}

exports.formSubmit = (req, res)=>{
    res.send('<h1 style="text-align:center">Form successfuly filled</h1><h2 style="text-align:center">Thank You!</h2>')
}