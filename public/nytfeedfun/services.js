'use strict';

angular.module('NYTFeedFun.services', ['ngResource'])
  .factory('Search', [function() {
    var search = {terms:''};
    search.reset = function() { search.terms = '' };
    return search;
  }])

  .factory('Feeds', ['$resource', function($resource) {
    return $resource('nytfeedfun/feeds/:feedId.json', {}, {
      get: {cache:true},
      query: {method:'GET', params:{feedId:'index'}, isArray:true, cache:true}
    });
  }]);
