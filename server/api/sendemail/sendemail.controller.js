'use strict';

var _ = require('lodash');
var Sendemail = require('./sendemail.model');
var Fuzzy = require('./fuzzy.model')
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('oI4ORuYUtNS5MFNOEcJBcQ');

// Get list of sendemails
exports.index = function(req, res) {
  Sendemail.find(function (err, sendemails) {
    if(err) { return handleError(res, err); }
    return res.json(200, sendemails);
  });
};

// Get a single sendemail
exports.show = function(req, res) {
  Sendemail.findById(req.params.id, function (err, sendemail) {
    if(err) { return handleError(res, err); }
    if(!sendemail) { return res.send(404); }
    return res.json(sendemail);
  });
};

// Creates a new sendemail in the DB.
// exports.create = function(req, res) {
//   Sendemail.create(req.body, function(err, sendemail) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, sendemail);
//   });
// };

// Creates a new sendemail in the DB.
exports.sendEmail = function(req, res) {

    var userMessage = req.body.message;
    var sendEmail = req.body.email;
  

    var message = {
      "html": "<h1>This is the best email ever!</h1><p>One of your friends as sent you a Fuzzy!!!!</p> <div style='background-color:pink; text-align:left; font-family:cursive; width:75%; margin: 0 auto; white-space:pre-wrap; box-shadow: 10px 10px 10px #888888; font-size: 5em; padding-left: 0.5em; padding-right: 0.5em;'>"+userMessage+"</div><p>Did you like your fuzzy? If you did, send one to someone who brightens up your day!</p>",
      "subject": "First Fuzzy email!",
      "from_email": "yourfuzzyfriend@fuzzies.io",
      "from_name": "Dr. FuzzyMcMailer",
      "to": [{
        "email": sendEmail,
        "name": sendEmail
      }],
      "important": false,
      "track_opens": true,
      "auto_html": false,
      "preserve_recipients": true,
      "merge": false,
      "tags": [
      "Fuzzy", 
      "Fuzzies"
      ]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(message);
        console.log(result);
        Fuzzy.create(req.body, function(err, fuzzy) {
         if(err) { return handleError(res, err); }
           res.json(201, {email: fuzzy.email, sent: true});
        });
    }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      res.json(500, {email: 'A mandrill error occurred: ' + e.name + ' - ' + e.message, sent:false});
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
};

// Updates an existing sendemail in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sendemail.findById(req.params.id, function (err, sendemail) {
    if (err) { return handleError(res, err); }
    if(!sendemail) { return res.send(404); }
    var updated = _.merge(sendemail, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, sendemail);
    });
  });
};

// Deletes a sendemail from the DB.
exports.destroy = function(req, res) {
  Sendemail.findById(req.params.id, function (err, sendemail) {
    if(err) { return handleError(res, err); }
    if(!sendemail) { return res.send(404); }
    sendemail.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}