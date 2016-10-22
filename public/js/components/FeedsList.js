// -*- mode: js2-jsx -*-
import React, { Component } from 'react';
import FeedLink from './FeedLink';

class FeedsList extends React.Component {
  render = () => {
    const feedsNodes = this.props.feeds.map(feed => {
      return (
        <FeedLink key={feed.id}
                  feed={feed}
                  selectFeed={this.props.selectFeed}
                  loadFeedItems={this.props.loadFeedItems} />
      );
    });
    return (
      <div>
        <h1>Feeds</h1>
        <div className="list-group">
          {feedsNodes}
        </div>
      </div>
    );
  }
}

export default FeedsList;
