'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GifsearchSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Gifsearch', GifsearchSchema);