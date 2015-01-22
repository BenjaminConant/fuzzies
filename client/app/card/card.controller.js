'use strict';

angular.module('fuzziesApp')
  .controller('CardCtrl', function ($scope, sendemail, $element, $document) {
    var self = this;
    $scope.showSpinner = false;
    $scope.card = {
    	message: "Hi Adam! \n\nYou are the absolute best. Thanks so much for helping me today!\n\n Love,\n\nGrace",
    	email: ""
    };
    $scope.sendFuzzy = function() {
    	if ($scope.card.email === undefined) {
            alert("please enter a valid email");
        } else {
            var card = $scope.card;
            $scope.card = {
                message: "\n\n\n\n\n\n\n\n\n\n",
                email: ""
            };
            $scope.showSpinner = true;
            sendemail.send(card).success(function(responceData) {
                $scope.showSpinner = false;
                if (responceData.sent === false) {
                    $scope.card = {
                         message: "Sorry :(\n We could not send your Fuzzy to "+ responceData.email + "\n\nPlease check the email and try again!"
                     }
                    $('#card-directive').css('height', "300px"); // to-do put this into directive and dont use jquery or hard code it.
                } else {
                    $scope.card = {
                         message: "Success!\nYour fuzzy has flown off to "+ responceData.email + "'s inbox!\n\nSend another Fuzzy :)\n\nYou know you want to!\n\nIt only takes a second ...\nand it will brighten up someones day!"
                     }
                    $('#card-directive').css('height', "484px"); // to-do put this into directive and dont use jquery or hard code it.
                }
            });
        }
    } 
  });
