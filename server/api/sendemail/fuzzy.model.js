'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FuzzySchema = new Schema({
  message: String,
  email: String, 
  backgroundColor: String
});

module.exports = mongoose.model('Fuzzy', FuzzySchema);