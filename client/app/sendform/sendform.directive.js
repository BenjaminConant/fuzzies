'use strict';

angular.module('fuzziesApp')
  .directive('sendform', function () {
    return {
      templateUrl: 'app/sendform/sendform.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });