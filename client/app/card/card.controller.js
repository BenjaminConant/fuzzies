'use strict';

angular.module('fuzziesApp')
  .controller('CardCtrl', function ($scope, sendemail, $rootScope, $routeParams, $location, $anchorScroll, $http) {
    
    var self = this;
    $scope.showSpinner = false;
    $scope.card = {
    	message: "Hey There!\n\nWelcome to Fuzzies! Send one to someone special ... It's sure to brighten up their day :) \n\n Love,\n\nDr. FuzzyMcMailer",
    	senderEmail: "",
      email: "", 
      backgroundColor: "",
      fontSize: "",
    };
    
    if ($routeParams.senderEmail){
      // we have params
      $scope.showFromTo = true;

      if ($routeParams.senderEmail !== "yourfuzzyfriend@fuzzies.io") {
        // we have a sender email and a reciver email
        if ($routeParams.senderEmail === $routeParams.sendEmail) {
          $scope.card.message = "Hey there "+ $routeParams.sendEmail.split('@')[0] +",\n\nIt looks like you just sent yourself a fuzzy ... Try sending one to someone else!!! \n\n It just takes a second and will brighten up their day :)" ,
          $scope.card.senderEmail = $routeParams.sendEmail;
        } else {
        $scope.card.message = "Hey there "+ $routeParams.sendEmail.split('@')[0] + ",\n\n" + $routeParams.senderEmail.split('@')[0] + " just sent you a Fuzzy! ... Cool right?!?! \n\nSend a Fuzzy back by changing this text and hitting the Send Fuzzy button!",
        $scope.card.email = $routeParams.senderEmail;
        $scope.card.senderEmail = $routeParams.sendEmail;
      }
      } else {
        // we only have a sender email
        $scope.card.message = "Hey there "+ $routeParams.sendEmail.split('@')[0] +",\n\nIt looks like you just got a Fuzzy! Try sending one to someone else!!! \n\n It just takes a second and will brighten up their day :)" ,
        $scope.card.senderEmail = $routeParams.sendEmail;
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

   

   
   $scope.sendFuzzy = function() {
        if ($scope.card.email === undefined) {
            alert("please enter a valid email");
        } else {
            var card = $scope.card;   
            $scope.showSpinner = true;
            sendemail.send(card).success(function(responceData) {
                $scope.showSpinner = false;
                document.body.scrollTop = 0;
                $scope.setActiveFontSize($scope.fonts[0]);
                $scope.card.message = "Success!\n" + responceData.email + "\n\nSend another Fuzzy :)\n\nYou know you want to!\n\nIt only takes a second ... and it will brighten up someones day!\n\n P.S - Did you know you can send fuzzies to multiple people? Just enter the emails as a comma seperated list ... like this \n\n tom@tom.com, ben@ben.com, drfuzzy@fuzz.com, and so on ...\n\n give it a shot!";
            });
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

