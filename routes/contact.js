const express = require('express');
const path = require('path');
const rooDir = require('../util/path')

const contactController = require('../controllers/contact');

const router = express.Router();

router.get('/contactus', contactController.getContact);
router.post('/success', contactController.postContact);
router.get('/formsubmited', contactController.formSubmit);

module.exports = router;

