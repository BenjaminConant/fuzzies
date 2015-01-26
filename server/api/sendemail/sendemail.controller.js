'use strict';

var _ = require('lodash');
var Sendemail = require('./sendemail.model');
var Fuzzy = require('./fuzzy.model')
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('WlzlcZRhJG-67rnW3nWf0Q');
var webshot = require('webshot');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'fuzzies', 
  api_key: '285285339937268', 
  api_secret: 'qCPv4pm7k80fMB_d6Gx5sbJdBGI' 
});
// Twilio Credentials 
var accountSid = 'AC3b07b1b4eb5ae44c46dd0a06e2c08a4e'; 
var authToken = '15081e20d617edeac58a3b25e64c18d6'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 


// Send One or more Fuzzies via email!
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

exports.sendEmails = function(req, res) {

  console.log("hello from the backend!");
  var senderEmail = req.body.senderEmail;
  var sendToEmailArray = req.body.email.split(',');
  var userMessage = req.body.message;
  var backgroundColor = req.body.backgroundColor;
  var fontSize = req.body.fontSize;

  if (!validateEmail(senderEmail)) {
    return res.json(500, {Message: "you did not enter a vaild sender email."})
  } else {
    var emailsArray = [];
    var invalidsArray = [];
    var sendToArray = sendToEmailArray;
    if (sendToArray.length > 0) { /////////////////where close??????????
      sendToArray.forEach(function(sendTo){
        var sendTo = sendTo.trim();
        if (validateEmail(sendTo)) {
          /// we have a valid sender and a valid sendto email --- now we should request our backend to send an email
          emailsArray.push(sendTo);
        } else {
          //// this send to was invalid
          invalidsArray.push(sendTo);
        }
      });
      if (invalidsArray.length > 0) {
        //////// we have at least one invalid respond with error
        return res.json(500, {message: "Whoops ... it looks like the following emails or numbers were invalid :(. Please check them and try again!"});
        } else if (emailsArray.length > 0 && emailsArray.length < 50) {
           //////// we have emails and no invalids !!!!!!!!!!!!!!! send the emails and then respond with succsess

         var moreThanOneEmail = emailsArray.length > 1; 
         if (moreThanOneEmail) {
           var emails = "Your Fuzzies have flown off to the inboxes of ";
          } else {
            var emails = "Your Fuzzy has flown off to ";
          }

          emailsArray.forEach(function(sendEmail, index, array){
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
        })
        res.json(200, {'email':emails});        

        } else {
          return res.json(500, {message:"Whoops :( looks like your sending too many Fuzzies :( try sending less than 50"});
        }
    } else {
      ///// we do not have any send to emails respond with error
      return res.json(500, {message:"Whoops :( looks like you did not send your Fuzzy to anybody :(. Check and try again!"});
    }
  }
};


// Send One or more Fuzzies via text
exports.sendTexts = function(req, res) {
 var senderEmail = req.body.senderEmail;

 if (!validateEmail(senderEmail)) {
    return res.json(500, {Message: "you did not enter a vaild sender email."}) 
  } else {
   if (senderEmail.split('@')[1] === "fuzzytexts.io") {
    senderEmail = senderEmail.split('@')[0];
   }



    var numbersToText = req.body.numbers;
    
    var senderEmailName = senderEmail.split('@')[0];
    var userMessage = req.body.message;
    var sendEmailArray = req.body.email.split(', ');
    var sendEmail = sendEmailArray[0];
    var sendEmailName = sendEmailArray[0];
    var backgroundColor = req.body.backgroundColor;
    var headerBackgroundColor = "black";
    var fontSize = req.body.fontSize;
    var htmlForWebShot = "<!doctype html><head><style>.header{font-family:Arial, Helvetica, sans-serif} #text{font-family: cursive, 'Comic Sans MS', sans-serif}</style></head><body style='padding: 0; margin: 0;'><div class='header' style='padding-bottom:0.5em; padding-top:0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:"+headerBackgroundColor+";'>A friend sent you a Fuzzy!</div><div style='height: 100%; background-color:"+backgroundColor+"; padding-top: 1em; padding-bottom: 1em; text-align:left; width:100%; margin: 0 auto; white-space:pre-wrap; font-size:"+fontSize+"; padding-left: 0.5em; padding-right: 0.5em;'><div id='text' style='width:95%; font-style: italic;'>"+userMessage+"</div></div> <div style='font-family:Arial, Helvetica, sans-serif; padding-bottom:0.5em; padding-top:0.5em; padding-right: 0.5em; text-align:center; margin:0 auto; font-size: 4em; color:white; width:100%; background-color:"+headerBackgroundColor+";'>Click the link below to reply!</div></body></html>";
    
    webshot(htmlForWebShot, 'hello_world.png', {siteType:'html', shotSize:{height:'all', width: 'all'}}, function(err) {
      cloudinary.uploader.upload('hello_world.png', function(result) { 
        console.log(result);
        console.log(result.url)
        console.log(result.secure_url);
        numbersToText.forEach(function(number) {
          client.messages.create({ 
              to: number, 
              from: "+19178096527",  
              body: senderEmail + " sent you a Fuzzy!!! To reply click this link " + 'http://fuzzies.herokuapp.com/'+number+'/'+senderEmail, 
              mediaUrl: result.secure_url,  
            }, function(err, message) { 
              console.log(message.sid); 
          });
        })
      return res.json(200, {email: "Your text(s) have flown off to " + numbersToText.join(', ')});
      })
    })
  }
}
  



function handleError(res, err) {
  return res.send(500, err);
}