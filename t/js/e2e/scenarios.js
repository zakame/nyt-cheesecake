/*global describe,browser,it,expect,beforeEach,element,by */

'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /feeds when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/feeds");
  });


  describe('feeds', function() {

    beforeEach(function() {
      browser.get('index.html#/feeds');
    });


    it('should render feeds when user navigates to /feeds', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/New York Times RSS feeds/);
    });

  });


  describe('feed', function() {

    beforeEach(function() {
      browser.get('index.html#/feed/1');
    });


    it('should render feed/1 when user navigates to /feed/1', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/NYT >/);
    });

  });
});
