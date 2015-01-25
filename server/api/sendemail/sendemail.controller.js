'use strict';

var _ = require('lodash');
var Sendemail = require('./sendemail.model');
var Fuzzy = require('./fuzzy.model')
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('WlzlcZRhJG-67rnW3nWf0Q');
// var webshot = require('webshot');
// var fs = require('fs');

// webshot('google.com', './google.png', function(err) {
//   // screenshot now saved to google.png
// });

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

// webshot('google.com', './thing.png', function(errr) {
  // if (errr) {
  //   console.log(errr) 
  //   console.log(data + "-------------this is data--------------------");
  // } else {
  //   console.log("an image was generated!!!");
  // }
  // screenshot now saved to hello_world.png
  // webshot("<div><div style='padding-left: 0.5em; font-family:Arial, Helvetica, sans-serif; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black;'>One of your friends has sent you a Fuzzy!!!!</div><div style='background-color:"+backgroundColor+"; padding-top: 1em; padding-bottom: 1em; text-align:left; font-family:cursive; width:100%; margin: 0 auto; white-space:pre-wrap; font-size:"+fontSize+"; padding-left: 0.5em; padding-right: 0.5em;'><div style='width:95%;'>"+userMessage+"</div></div><div style='padding-left: 0.5em; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black; font-family:Arial, Helvetica, sans-serif;'>Did you like your Fuzzy? <a href='https://fuzzies.herokuapp.com/'>Send one by reply!</a></div></div>", './hello_world_node_html_markup_dynamic.png', {siteType:'html'}, function(err) {


// Creates a new sendemail in the DB.
exports.sendEmail = function(req, res) {
  

    if (req.body.senderEmail === "") {
      var senderEmail = "yourfuzzyfriend@fuzzies.io";
       var senderEmailName = "yourfuzzyfriend@fuzzies.io";
    } else {
      var senderEmail = req.body.senderEmail;
      var senderEmailName = senderEmail.split('@')[0];
    }
   
    var userMessage = req.body.message;
    var sendEmailArray = req.body.email.split(', ');
    var backgroundColor = req.body.backgroundColor;
    var fontSize = req.body.fontSize;
    
   
    var moreThanOneEmail = sendEmailArray.length > 1; 
    if (moreThanOneEmail) {
      var emails = "Your Fuzzies have Flown off to the inboxes of ";
    } else {
      var emails = "Your Fuzzy has Flown of to ";
    }
    sendEmailArray.forEach(function(sendEmail, index, array){
      if (moreThanOneEmail) {
        if (index === array.length - 1) {
          emails += "and " + sendEmail + "!";
        } else {
          emails += sendEmail + " ";
        }
      } else {
         emails += sendEmail + "'s' inbox!";
      }

      var sendEmailName = sendEmail.split('@')[0];
      console.log(sendEmail);
      console.log(sendEmail.split('@'));
   


      var message = {
        "html": "<div><div style='padding-left: 0.5em; font-family:Arial, Helvetica, sans-serif; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black;'>One of your friends sent you a Fuzzy!!!!</div><div style='background-color:"+backgroundColor+"; padding-top: 1em; padding-bottom: 1em; text-align:left; font-family:cursive; width:100%; margin: 0 auto; white-space:pre-wrap; font-size:"+fontSize+"; padding-left: 0.5em; padding-right: 0.5em;'><div style='width:95%;'>"+userMessage+"</div></div><div style='padding-left: 0.5em; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black; font-family:Arial, Helvetica, sans-serif;'>Loved your Fuzzy? <a href='http://fuzzies.herokuapp.com/"+sendEmailName+"/"+senderEmailName+"'"+">Send one by reply!</a></div></div>",
        "subject": "You got a Fuzzy!!!",
        "from_email": senderEmail,
        "from_name": "Dr. FuzzyMcMailer",
        "to": [{
          "email": sendEmail,
          "name": sendEmailName
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
        console.log(result);
        Fuzzy.create(req.body, function(err, fuzzy) {
         if(err) { console.log("hello from database err"); return handleError(res, err); }
        });
    }, function(e) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
    // });
    })
    
    res.json(200, {'email':emails});
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