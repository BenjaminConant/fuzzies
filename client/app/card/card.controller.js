'use strict';

angular.module('fuzziesApp')
  .controller('CardCtrl', function ($scope, sendemail, $rootScope, $routeParams, $location, $anchorScroll, $http, $timeout) {
    $scope.backgroundGifs = [];

    var self = this;
    $scope.showSpinner = false;
    $scope.card = {
    	// message: "Hey There!\n\nWelcome to Fuzzies! Send one to someone special ... It's sure to brighten up their day :) \n\n Love,\n\nDr. FuzzyMcMailer",
      message: "",
    	senderEmail: "",
      email: "", 
      backgroundColor: "",
      fontSize: "",
      touched: false,
      cardBackgroundImage: "",
      fontColor: "",
    };
    $scope.typeMessage = function() {
        simulateTyping("Hi cool person!\n\n Welcome to GIFter :) \nSearch for a GIF you like and then customize it by changing this\ntext.\n\n Afterwards you can share it out to the internets ... Cool right??");
        function simulateTyping(str) {
        var currentCharIndex = 0;
        function typeChar(){
          if (currentCharIndex >= str.length)
            return;
          var char = str[currentCharIndex];
          $scope.card.message += char;
          currentCharIndex ++;
          $scope.$apply();
          setTimeout(typeChar, 80);
        } 
        
        typeChar();
        
      }
    }





      // console.log("hello");
      // var message = "Hey There!\n\nWelcome to Fuzzies! Send one to someone special ... It's sure to brighten up their day :) \n\n Love,\n\nDr. FuzzyMcMailer";
      // var messageArray = message.split('');
      // console.log(messageArray);
      // messageArray.forEach(function(letter){
      //   console.log("hello");
      //   $timeout(function() {
      //     $scope.card.message += letter;
      //     $scope.$apply();
      //   }, 2000);
      // });
    
    $scope.typeMessage();
    var firstSearch = false;
    $scope.$on('gotGifs', function(event, gifs){
        gifs = gifs.gifs
        if (!firstSearch) {
          $scope.backgroundGifs = [{url:'http://media.giphy.com/media/tuvMgAPzxaQBq/giphy.gif', active:false}];
          firstSearch = true;
        } else {
          $scope.backgroundGifs = [];
        }
        gifs.forEach(function(gif){
          $scope.backgroundGifs.push({url: gif, active: false});
        })
        $scope.backgroundGifs[0].active = true;
        $scope.card.cardBackgroundImage = $scope.backgroundGifs[0].url;
        console.log($scope.card.cardBackgroundImage);

    })

    $scope.fontColors = [
    {color: "black", active: false}, 
    {color: "white", active: true}, 
    {color: "pink", active: false}, 
    {color: "red", active: false}, 
    {color: "blue", active: false}, 
    {color: "green", active: false}, 
    ]

    $scope.setActiveFontColor = function (fontColor) {
      $scope.fontColors.forEach(function(fontColor){
        fontColor.active = false;
      })
      fontColor.active = true;
      $scope.card.fontColor = fontColor.color;
    }

    $scope.card.fontColor = $scope.fontColors[0].color

    // $scope.backgroundGifs = [
    // {url:"https://4.bp.blogspot.com/-fYJrkNWec08/T9EYOmNGPNI/AAAAAAAAC04/UtdRRM8a3hc/s640/cat-fat-dancing-cat-gif.gif" , active: true},
    // {url:"https://lh6.googleusercontent.com/-78R9J4scXL4/VAW9S0lZfWI/AAAAAAAABns/YX_EA72-jF4/w500-h380/to%2Bdarn%2Bcute%2521.gif", active: false},
    // {url:"https://media.giphy.com/media/gWl3BxSPsndle/giphy.gif" , active: false}
    // ];

    // $scope.card.cardBackgroundImage = $scope.backgroundGifs[0].url;

    $scope.setActiveGif = function (gif) {
      $scope.card.cardBackgroundImage = gif.url;
      $scope.backgroundGifs.forEach(function(gif) {
        gif.active = false;
      })
      gif.active = true;
    }
    
    if ($routeParams.senderEmail){
      // we have params
      $scope.showFromTo = true;

      if ($routeParams.senderEmail !== "yourfuzzyfriend@fuzzies.io") {
        // we have a sender email and a reciver email
        if ($routeParams.senderEmail === $routeParams.sendEmail) {
          $scope.card.message = "Hey there "+ $routeParams.sendEmail.split('@')[0] +",\n\nIt looks like you just sent yourself a fuzzy ... Try sending one to someone else!!! \n\n It just takes a second and will brighten up their day :)";
          $scope.card.senderEmail = $routeParams.sendEmail;
        } else {
          $scope.card.message = "Hey there "+ $routeParams.sendEmail.split('@')[0] + ",\n\n" + $routeParams.senderEmail.split('@')[0] + " just sent you a Fuzzy! ... Cool right?!?! \n\nSend a Fuzzy back by changing this text and hitting the Send Fuzzy button!";
          if ($routeParams.senderEmail.split('@')[1] === 'fuzzytexts.io') {
            // we have a phone number sender
            console.log("we got to 29")
            $scope.card.email = $routeParams.senderEmail.split('@')[0];
            $scope.card.senderEmail = $routeParams.sendEmail;
          } else {
             console.log("we got to 33")
            $scope.card.email = $routeParams.senderEmail;
            $scope.card.senderEmail = $routeParams.sendEmail;
          }
      }
      } else {
        // we only have a sender email
        $scope.card.message = "Hey there "+ $routeParams.sendEmail.split('@')[0] +",\n\nIt looks like you just got a Fuzzy! Try sending one to someone else!!! \n\n It just takes a second and will brighten up their day :)";
        $scope.card.senderEmail = $routeParams.sendEmail;
      }
    } 

  $scope.removeDefault = function() {
    console.log("hell0");
    if ($scope.card.touched === false) {
      $scope.card.touched = true;
      $scope.card.message = "";
    }
  }  
    
  $scope.colors = [
   {color:"pink", active: true},
   {color:"#FF80AB", active:false}, 
   {color:"#EA80FC", active:false}, 
   {color:"#B388FF", active:false}, 
   {color:"#8C9EFF", active:false},
   {color:"#82B1FF", active:false},
   {color:"#80D8FF", active:false},
   {color:"#84FFFF", active:false},
   {color:"#A7FFEB", active:false},
   {color:"#B9F6CA", active:false},
   {color:"#CCFF90", active:false},
   {color:"#F4FF81", active:false},
   {color:"#FFE57F", active:false},
   {color:"#FFD180", active:false},
   {color:"#FF6E40", active:false}
   ]; /// taken from top of botom div on google design spec

   $scope.fonts = [
    {name: 1, displaySize: "10px", size:"2em", active: true},
    {name: 2, displaySize: "10px", size:"3em", active: true},
    {name: 3, displaySize: "15px", size:"4em", active: true},
   ];

   $scope.setActiveFontSize = function (font) {
    $scope.fonts.forEach(function(fontObject){
        fontObject.active = false;
    })
    font.active = true;
    $scope.card.fontSize = font.size;
   }
   $scope.setActiveFontSize($scope.fonts[0]);

   


    function validateEmail(email) { 
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
   
   $scope.sendFuzzy = function() {
      
      if (!validateEmail($scope.card.senderEmail) && $scope.card.senderEmail.replace(/[^\d]/g,'').length !== 10) {
        alert("Whoops :( your or cell number email was not valid. Please enter a valid email in the top input box!");     
      } else {
        if ($scope.card.senderEmail.split('@').length === 1) {
          var cellEmail = $scope.card.senderEmail + '@fuzzytexts.io';
        }
        console.log($scope.card.senderEmail); 
        var emailsArray = [];
        var textsArray = [];
        var invalidsArray = [];
        var sendToArray = $scope.card.email.split(',');

        if (sendToArray.length > 0) {
          sendToArray.forEach(function(sendTo){
            var sendTo = sendTo.trim();
            if (validateEmail(sendTo)) {
              /// we have a valid sender and a valid sendto email --- now we should request our backend to send an email
              emailsArray.push(sendTo);
            } else if (sendTo.replace(/[^\d]/g,'').length === 10) {
              ////// user has entered a valid phone number and a valid sender email .... send to our texting rout
              textsArray.push(sendTo);
            } else {
              //// this send to was invalid
              invalidsArray.push(sendTo);
            }
          });

          if (invalidsArray.length > 0) {
            //////// we have at least one invalid input log it out 
            alert("Whoops ... it looks like the following emails or numbers were invalid :(. Please check them and try again! " + invalidsArray.join(', '));
          } else if ((textsArray.length > 0 || emailsArray.length > 0)  && textsArray.length + emailsArray.length < 50) {
             //////// there are no invalids
             if ( emailsArray.length > 0) {
               $scope.card.emails = emailsArray.join(", ");
               var card = {
                message: $scope.card.message,
                senderEmail: $scope.card.senderEmail,
                email: $scope.card.email, 
                backgroundColor: $scope.card.backgroundColor,
                fontSize: $scope.card.fontSize, 
                cardBackgroundImage: $scope.card.cardBackgroundImage
               }   
               if (cellEmail) {
                card.senderEmail = cellEmail; 
               }
               $scope.showSpinner = true;
               sendemail.send(card).success(function(responceData) {
                   console.log(responceData);
                   $scope.showSpinner = false;
                   document.body.scrollTop = 0;
                   $scope.setActiveFontSize($scope.fonts[0]);
                   $scope.card.message = "Success!\n" + responceData.email + "\n\nSend another Fuzzy :)\n\nYou know you want to!\n\nIt only takes a second ... and it will brighten up someones day!\n\n P.S - Did you know you can send fuzzies to multiple people? Just enter the emails as a comma seperated list ... like this \n\n tom@tom.com, ben@ben.com, drfuzzy@fuzz.com, and so on ...\n\n give it a shot!";
                   $scope.card.touched = false;
               }).error(function(err){
                console.log(err);
               });
               }

             if (textsArray.length > 0) {
               var card = {
                message: $scope.card.message,
                senderEmail: $scope.card.senderEmail,
                email: $scope.card.email, 
                backgroundColor: $scope.card.backgroundColor,
                fontSize: $scope.card.fontSize,
                numbers: textsArray
               }   
               if (cellEmail) {
                card.senderEmail = cellEmail; 
               }
              sendemail.sendTexts(card).success(function(responceData){
                 console.log(responceData);
                 $scope.showSpinner = false;
                 document.body.scrollTop = 0;
                 $scope.setActiveFontSize($scope.fonts[0]);
                 $scope.card.message = "Success!\n" + responceData.email + "\n\nSend another Fuzzy :)\n\nYou know you want to!\n\nIt only takes a second ... and it will brighten up someones day!\n\n P.S - Did you know you can send fuzzies to multiple people? Just enter the emails as a comma seperated list ...\n\nlike this \n\n tom@tom.com, ben@ben.com, drfuzzy@fuzz.com, ...\n\nor this, \n\n 888-888-8888, 999-999-9999, 111-111-1111, ... \n\ngive it a shot!";
                 $scope.card.touched = false;
              }).error(function(err){
                console.log(err);
              });    
             }
        } else {

          alert("Whoops :( looks like you did not send your Fuzzy to anybody :(. Check and try again!");
        }    
      }    
    } 
}



   
   $scope.setActiveColor = function (color) { 
    $scope.colors.forEach(function(colorObject){
        colorObject.active = false;
    })
    color.active = true;
    $scope.card.backgroundColor = color.color;
   }
   $scope.setActiveColor($scope.colors[0]);

   $scope.imageTest = function () {
    var card = $scope.card;
    console.log('hello');
    $http.post('api/sendemails/imagetest/', card).success(function(data){
      console.log(data.secure_url);
      console.log(data.url);
    })
   }












});

