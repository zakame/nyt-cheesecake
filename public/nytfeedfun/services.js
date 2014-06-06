'use strict';

angular.module('NYTFeedFun.services', ['ngResource'])
  .factory('Search', [function() {
    var search = {terms:''};
    search.reset = function() { search.terms = '' };
    return search;
  }])

  .factory('Feeds', ['$resource', '$cacheFactory',
  function($resource, $cacheFactory) {
    return $resource('nytfeedfun/feeds/:feedId.json', {}, {
      get: {cache:$cacheFactory('feeds-cache', {capacity:3})},
      query: {method:'GET', params:{feedId:'list'}, isArray:true, cache:true}
    });
  }]);
