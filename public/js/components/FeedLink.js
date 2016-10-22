// -*- mode: js2-jsx -*-
import React, { Component } from 'react';

class FeedLink extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.selectFeed(this.props.feed);
    this.props.loadFeedItems(this.props.feed.id);
  }
  render = () => {
    return (
      <a className="list-group-item" onClick={this.handleClick} href={this.props.feed.htmlUrl}>
        <h2 className="list-group-item-heading">{this.props.feed.title}</h2>
      </a>
    );
  }
}

export default FeedLink;
