'use strict';

describe('Service: sendemail', function () {

  // load the service's module
  beforeEach(module('fuzziesApp'));

  // instantiate service
  var sendemail;
  beforeEach(inject(function (_sendemail_) {
    sendemail = _sendemail_;
  }));

  it('should do something', function () {
    expect(!!sendemail).toBe(true);
  });

});
