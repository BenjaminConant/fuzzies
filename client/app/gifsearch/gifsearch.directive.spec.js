'use strict';

describe('Directive: gifsearch', function () {

  // load the directive's module and view
  beforeEach(module('fuzziesApp'));
  beforeEach(module('app/gifsearch/gifsearch.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gifsearch></gifsearch>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the gifsearch directive');
  }));
});