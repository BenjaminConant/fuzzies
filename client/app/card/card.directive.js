'use strict';

angular.module('fuzziesApp')
  .directive('card', function () {
    return {
      templateUrl: 'app/card/card.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });