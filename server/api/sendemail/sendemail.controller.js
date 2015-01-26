'use strict';

var _ = require('lodash');
var Sendemail = require('./sendemail.model');
var Fuzzy = require('./fuzzy.model')
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('WlzlcZRhJG-67rnW3nWf0Q');
var webshot = require('webshot');

// var fs = require('fs');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'fuzzies', 
  api_key: '285285339937268', 
  api_secret: 'qCPv4pm7k80fMB_d6Gx5sbJdBGI' 
});



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
        "html": "<div><div style='padding-left: 0.5em; font-family:Arial, Helvetica, sans-serif; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black;'>One of your friends sent you a Fuzzy!!!!</div><div style='background-color:"+backgroundColor+"; padding-top: 1em; padding-bottom: 1em; text-align:left; font-family:cursive; width:100%; margin: 0 auto; white-space:pre-wrap; font-size:"+fontSize+"; padding-left: 0.5em; padding-right: 0.5em;'><div style='width:95%;'>"+userMessage+"</div></div><div style='padding-left: 0.5em; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black; font-family:Arial, Helvetica, sans-serif;'>Loved your Fuzzy? <a href='http://fuzzies.herokuapp.com/"+sendEmail+"/"+senderEmail+"'"+">Send one by reply!</a></div></div>",
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

exports.imageTest = function(req, res) {
  
  if (req.body.senderEmail === "") {
      var senderEmail = "yourfuzzyfriend@fuzzies.io";
       var senderEmailName = "yourfuzzyfriend@fuzzies.io";
    } else {
      var senderEmail = req.body.senderEmail;
      var senderEmailName = senderEmail.split('@')[0];
    }
   
    var userMessage = req.body.message;
    var sendEmailArray = req.body.email.split(', ');
    var sendEmail = sendEmailArray[0];
    var sendEmailName = sendEmailArray[0];
    var backgroundColor = req.body.backgroundColor;
    var headerBackgroundColor = "black";
    var fontSize = req.body.fontSize;
    var htmlForWebShot = "<!doctype html><head><style>.header{font-family:Arial, Helvetica, sans-serif} #text{font-family: 'Alex Brush', crusive}</style></head><body style='padding: 0; margin: 0;'><div class='header' style='padding-bottom:0.5em; padding-top:0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:"+headerBackgroundColor+";'>A friend sent you a Fuzzy!</div><div style='height: 100%; background-color:"+backgroundColor+"; padding-top: 1em; padding-bottom: 1em; text-align:left; width:100%; margin: 0 auto; white-space:pre-wrap; font-size:"+fontSize+"; padding-left: 0.5em; padding-right: 0.5em;'><div id='text' style='width:95%;'>"+userMessage+"</div></div> <div style='font-family:Arial, Helvetica, sans-serif; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:"+headerBackgroundColor+";'>Click your Fuzzy to reply!</div></body></html>";
    webshot(htmlForWebShot, 'hello_world.png', {siteType:'html', shotSize:{height:'all', width: 'all'}}, function(err) {
        cloudinary.uploader.upload('hello_world.png', function(result) {
        console.log(result);
        console.log(result.url)
        console.log(result.secure_url);
        var message = {
                        "html": "<a href='http://fuzzies.herokuapp.com/"+sendEmailName+"/"+senderEmailName+"'"+"><img style='width:100%' src='"+result.secure_url+"'/></a>",
                        // "html":"<div><div style='padding-left: 0.5em; font-family:Arial, Helvetica, sans-serif; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black;'>One of your friends sent you a Fuzzy!!!!</div><div style='width: 100%; height: 100%;'><a href='http://fuzzies.herokuapp.com/"+sendEmailName+"/"+senderEmailName+"'"+"><img style='width: 100%; height: 100%;' src='"+result.secure_url+"'/></a></div><div style='padding-left: 0.5em; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:black; font-family:Arial, Helvetica, sans-serif;'>Loved your Fuzzy? <a href='http://fuzzies.herokuapp.com/"+sendEmailName+"/"+senderEmailName+"'"+">Send one by reply!</a></div>",
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
        
        res.json(200, result);
        })
});
}

















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