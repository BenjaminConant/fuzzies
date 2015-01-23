'use strict';

angular.module('fuzziesApp')
  .directive('elastic', ['$interval', '$timeout', function($interval, $timeout) {
    
    function link(scope, element, attrs) {
      function updateHeight() {
        element[0].style.height = "1px";
        element[0].style.height = "" + element[0].scrollHeight + "px";
      }

      var timeoutId = $interval(function() {
      updateHeight();
      $timeout(updateHeight, 0); // update DOM
     }, 5);

      }
      
      
      return {
        link: link
      };
  
}]);
