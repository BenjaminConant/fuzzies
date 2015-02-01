/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Gifsearch = require('./gifsearch.model');

exports.register = function(socket) {
  Gifsearch.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Gifsearch.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('gifsearch:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('gifsearch:remove', doc);
}