'use strict';

var express = require('express');
var controller = require('./sendemail.controller');

var router = express.Router();

router.post('/', controller.sendEmail);
//router.post('/imagetest', controller.imageTest);


module.exports = router;