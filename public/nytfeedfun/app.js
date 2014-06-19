/*global angular */

'use strict';

angular.module('NYTFeedFun', [
  'ngRoute',
  'angular-loading-bar',
  'ui.bootstrap',
  'NYTFeedFun.services',
  'NYTFeedFun.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feeds', {templateUrl:'nytfeedfun/partials/feeds.html', controller:'Feeds'});
  $routeProvider.when('/feed/:feedId', {templateUrl:'nytfeedfun/partials/feed.html', controller:'Feed'});
  $routeProvider.otherwise({redirectTo:'/feeds'});
}]);
