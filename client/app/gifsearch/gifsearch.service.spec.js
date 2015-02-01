'use strict';

describe('Service: gifsearch', function () {

  // load the service's module
  beforeEach(module('fuzziesApp'));

  // instantiate service
  var gifsearch;
  beforeEach(inject(function (_gifsearch_) {
    gifsearch = _gifsearch_;
  }));

  it('should do something', function () {
    expect(!!gifsearch).toBe(true);
  });

});
