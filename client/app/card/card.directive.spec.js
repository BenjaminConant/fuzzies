'use strict';

describe('Directive: card', function () {

  // load the directive's module and view
  beforeEach(module('fuzziesApp'));
  beforeEach(module('app/card/card.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<card></card>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the card directive');
  }));
});