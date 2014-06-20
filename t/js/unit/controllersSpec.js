/*global describe,beforeEach,module,angular,inject,it,expect */

'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('NYTFeedFun'));
  beforeEach(module('NYTFeedFun.services'));
  beforeEach(module('NYTFeedFun.controllers'));

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('Feeds', function() {
    var scope, ctrl, $httpBackend;
    var feedList = function() {
      return [
        {
          id: 1,
          type: 'rss',
          title: 'Media Decoder',
          xmlUrl: 'http://mediadecoder.blogs.nytimes.com/feed/',
          htmlUrl: ''
        },
        {
          id: 2,
          type: 'rss',
          title: 'NYT > Africa',
          xmlUrl: 'http://www.nytimes.com/services/xml/rss/nyt/Africa.xml',
          htmlUrl: 'http://www.nytimes.com/pages/international/africa/index.html'
        }
      ];
    };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('nytfeedfun/feeds/list.json')
        .respond(feedList());
        scope = $rootScope.$new();
        ctrl = $controller('Feeds', {$scope: scope});
    }));

    it('should get the feed list', inject(function() {
      expect(scope.feeds).toEqualData([]);
      $httpBackend.flush();

      expect(scope.feeds).toEqualData(feedList());
    }));
  });

  describe('Feed', function() {
    var scope, ctrl, $httpBackend;
    var feedDetail = function() {
      return {
        title: 'NYT > Media',
        link: 'http://www.nytimes.com/pages/business/media/index.html',
        items: [ 1, 2, 3 ]
      };
    };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('nytfeedfun/feeds/100.json')
        .respond(feedDetail());
        $routeParams.feedId = '100';
        scope = $rootScope.$new();
        ctrl = $controller('Feed', {$scope: scope});
    }));

    it('should get feed detail', inject(function() {
      expect(scope.feed).toEqualData({});
      $httpBackend.flush();

      expect(scope.feed).toEqualData(feedDetail());
    }));
  });

  it('should have a Search controller', inject(function($controller) {
    var search = $controller('Search', {$scope:{}});
    expect(search).toBeDefined();
  }));
});
