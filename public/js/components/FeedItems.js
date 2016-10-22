// -*- mode: js2-jsx -*-
import React, { Component } from 'react';
import Feed from './Feed';

class FeedItems extends Component {
  render = () => {
    const feedItemsNodes = this.props.items.map((item, idx) => {
      return (
        <Feed key={idx+1} item={item} />
      );
    });
    return (
      <div>
        <a href={this.props.selected.htmlUrl}>
          <h1>{this.props.selected.title}</h1>
        </a>
        {feedItemsNodes}
      </div>
    );
  }
}

export default FeedItems;
