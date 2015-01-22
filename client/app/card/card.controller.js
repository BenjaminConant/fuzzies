'use strict';

angular.module('fuzziesApp')
  .controller('CardCtrl', function ($scope) {
    var self = this;

    $scope.card = {
    	message: "Hi Adam! \n\nYou are the absolute best. Thanks so much for helping me today!\n\n Love, \n\nGrace",
    	email: ""
    };

    $scope.sendFuzzy = function() {
    	console.log($scope.card.message);
    }

    
    
  });
