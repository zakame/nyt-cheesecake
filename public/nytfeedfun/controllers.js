'use strict';

angular.module('NYTFeedFun.controllers', ['ngSanitize'])
  .controller('Feeds', ['$scope', 'Feeds', function($scope, Feeds) {
    $scope.feeds = Feeds.query();
  }])

  .controller('Feed', ['$scope', '$routeParams', 'Feeds',
  function($scope, $routeParams, Feeds) {
    $scope.feed = Feeds.get({feedId: $routeParams.feedId});
  }]);
