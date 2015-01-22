'use strict';

describe('Directive: elastic', function () {

  // load the directive's module
  beforeEach(module('fuzziesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<elastic></elastic>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the elastic directive');
  }));
});