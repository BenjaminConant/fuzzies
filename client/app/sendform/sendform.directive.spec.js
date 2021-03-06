'use strict';

describe('Directive: sendform', function () {

  // load the directive's module and view
  beforeEach(module('fuzziesApp'));
  beforeEach(module('app/sendform/sendform.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sendform></sendform>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sendform directive');
  }));
});