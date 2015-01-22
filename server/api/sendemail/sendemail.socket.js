/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sendemail = require('./sendemail.model');

exports.register = function(socket) {
  Sendemail.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sendemail.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sendemail:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sendemail:remove', doc);
}