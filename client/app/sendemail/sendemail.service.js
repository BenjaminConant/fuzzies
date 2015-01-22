'use strict';

angular.module('fuzziesApp')
  .factory('sendemail', function ($http) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      send: function (card) {
        return $http.post('api/sendemails', card);
      }
    };
  });
