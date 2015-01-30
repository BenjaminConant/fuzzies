'use strict';

var _ = require('lodash');
var Gif = require('./gif.model');
var request = require('request');





// Get list of gifs
exports.index = function(req, res) {
  
  request('http://api.giphy.com/v1/gifs/search?q=spooky+scary&api_key=dc6zaTOxFJmzC&limit=10', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var gifArray = JSON.parse(body).data;
    console.log(gifArray);
    var returnArray = [];
    gifArray.forEach(function(gifObj){
      returnArray.push(gifObj.images.original.url);
      console.log(gifObj.images.original.url);
    });
    return res.json(200, {gifs: returnArray});


    // console.log(JSON.parse(body).data) // Show the HTML for the Google homepage.
  }
});

};

// Get a single gif
exports.show = function(req, res) {
  Gif.findById(req.params.id, function (err, gif) {
    if(err) { return handleError(res, err); }
    if(!gif) { return res.send(404); }
    return res.json(gif);
  });
};

// Creates a new gif in the DB.
exports.create = function(req, res) {
  Gif.create(req.body, function(err, gif) {
    if(err) { return handleError(res, err); }
    return res.json(201, gif);
  });
};

// Updates an existing gif in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Gif.findById(req.params.id, function (err, gif) {
    if (err) { return handleError(res, err); }
    if(!gif) { return res.send(404); }
    var updated = _.merge(gif, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, gif);
    });
  });
};

// Deletes a gif from the DB.
exports.destroy = function(req, res) {
  Gif.findById(req.params.id, function (err, gif) {
    if(err) { return handleError(res, err); }
    if(!gif) { return res.send(404); }
    gif.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}