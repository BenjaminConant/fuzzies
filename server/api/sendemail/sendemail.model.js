'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SendemailSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Sendemail', SendemailSchema);