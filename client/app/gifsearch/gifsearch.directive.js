'use strict';

angular.module('fuzziesApp')
  .controller('gifSearchCtrl', function ($scope, $http, gifsearch, $rootScope) {
  	$scope.gifSearchTerm = "funny cats";
  	$scope.search = function() {
  		gifsearch.search($scope.gifSearchTerm, function (data){
  			$rootScope.$broadcast('gotGifs', data);
  			console.log(data);
  		})
  	}
  	$scope.search();
  })
  .directive('gifsearch', function () {
    return {
      templateUrl: 'app/gifsearch/gifsearch.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });