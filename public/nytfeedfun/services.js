'use strict';

angular.module('NYTFeedFun.services', ['ngResource'])
  .factory('Search', [function() {
    var search = {terms:''};
    search.reset = function() { search.terms = '' };
    return search;
  }])

  .factory('Feeds', ['$resource', function($resource) {
    return $resource('nytfeedfun/feeds/:feedId.json', {}, {
      query: {method:'GET', params:{feedId:'index'}, isArray:true}
    });
  }]);
