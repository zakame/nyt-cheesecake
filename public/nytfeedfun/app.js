'use strict';

angular.module('NYTFeedFun', [
  'ngRoute',
  'NYTFeedFun.services',
  'NYTFeedFun.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {templateUrl:'nytfeedfun/partials/index.html', controller:'Index'});
  $routeProvider.when('/feed/:feedId', {templateUrl:'nytfeedfun/partials/feed.html', controller:'Feed'});
  $routeProvider.otherwise({redirectTo:'/index'});
}]);
