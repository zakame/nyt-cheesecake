// -*- mode: js2-jsx -*-
import React, { Component } from 'react';
import FeedLink from './FeedLink';

class FeedsList extends Component {
  componentDidMount = () => {
    this.props.loadFeeds();
    document.body.scrollIntoView();
  }
  render = () => {
    const feedsNodes = this.props.feeds.map(feed => {
      return (
        <FeedLink key={feed.id}
                  feed={feed}
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
