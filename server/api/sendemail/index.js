'use strict';

var express = require('express');
var controller = require('./sendemail.controller');

var router = express.Router();

router.post('/', controller.sendEmails);
router.post('/sendtexts', controller.sendTexts);


module.exports = router;