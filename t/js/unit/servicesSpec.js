/*global describe,beforeEach,module,it,inject,expect */

'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('NYTFeedFun.services'));

  describe('Search', function() {
    it('should return empty Search terms', inject(function(Search) {
      expect(Search.terms).toBe('');
    }));
  });
});
