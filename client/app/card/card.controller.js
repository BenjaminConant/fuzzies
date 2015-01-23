'use strict';

angular.module('fuzziesApp')
  .controller('CardCtrl', function ($scope, sendemail, $rootScope) {
    var self = this;
    $scope.showSpinner = false;
    $scope.card = {
    	message: "Hi Adam!\n\nYou are the absolute best. Thanks so much for helping me\ntoday!\n\n Love,\n\nGrace",
    	email: "", 
      backgroundColor: "",
      fontSize: "",
    };
    
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
                $scope.card.message = "Success!\nYour Fuzzy has flown off to "+ responceData.email + "'s inbox!\n\nSend another Fuzzy :)\n\nYou know you want to!\n\nIt only takes a second ... and it will brighten up someones day!\n";
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












});

