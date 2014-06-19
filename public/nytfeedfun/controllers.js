/*global angular */

'use strict';

angular.module('NYTFeedFun.controllers', ['ngSanitize'])
  .controller('Search', ['$scope', 'Search', function($scope, Search) {
    $scope.search = Search;
    $scope.navCollapsed = true;
  }])

  .controller('Feeds', ['$scope', 'Feeds', 'Search',
  function($scope, Feeds, Search) {
    $scope.feeds  = Feeds.list();
    $scope.search = Search;
    $scope.search.reset();
  }])

  .controller('Feed', ['$scope', '$routeParams', 'Feeds', 'Search',
  function($scope, $routeParams, Feeds, Search) {
    $scope.feed   = Feeds.get({feedId: $routeParams.feedId});
    $scope.search = Search;
    $scope.search.reset();
  }]);
