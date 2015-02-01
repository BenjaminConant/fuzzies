'use strict';

angular.module('fuzziesApp')
  .factory('gifsearch', function ($http) {
    return {
      search: search 
    };
    function search(term, cb) {
      term = term.split(' ').join('+');
      $http.get('/api/gifsearchs/' + term).success(function(gifs){
        cb(gifs);
      }).error(function(err){
        console.log(err);
      });
    }
  });
