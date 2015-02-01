'use strict';

var _ = require('lodash');
var Gifsearch = require('./gifsearch.model');
var request = require('request');


// search giffly API for gifs based on search term
exports.search = function (req, res) {
  request('http://api.giphy.com/v1/gifs/search?q='+req.params.term+'&api_key=dc6zaTOxFJmzC&limit=10', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var gifArray = JSON.parse(body).data;
      console.log(gifArray);
      var returnArray = [];
      gifArray.forEach(function(gifObj){
        returnArray.push(gifObj.images.original.url);
        console.log(gifObj.images.original.url);
      });
      return res.json(200, {gifs: returnArray});
    }
    console.log(error);
  });
};



// Get list of gifsearchs
exports.index = function(req, res) {
  Gifsearch.find(function (err, gifsearchs) {
    if(err) { return handleError(res, err); }
    return res.json(200, gifsearchs);
  });
};

// Get a single gifsearch
exports.show = function(req, res) {
  Gifsearch.findById(req.params.id, function (err, gifsearch) {
    if(err) { return handleError(res, err); }
    if(!gifsearch) { return res.send(404); }
    return res.json(gifsearch);
  });
};

// Creates a new gifsearch in the DB.
exports.create = function(req, res) {
  Gifsearch.create(req.body, function(err, gifsearch) {
    if(err) { return handleError(res, err); }
    return res.json(201, gifsearch);
  });
};

// Updates an existing gifsearch in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Gifsearch.findById(req.params.id, function (err, gifsearch) {
    if (err) { return handleError(res, err); }
    if(!gifsearch) { return res.send(404); }
    var updated = _.merge(gifsearch, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, gifsearch);
    });
  });
};

// Deletes a gifsearch from the DB.
exports.destroy = function(req, res) {
  Gifsearch.findById(req.params.id, function (err, gifsearch) {
    if(err) { return handleError(res, err); }
    if(!gifsearch) { return res.send(404); }
    gifsearch.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}