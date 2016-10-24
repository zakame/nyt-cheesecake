// -*- mode: js2-jsx -*-
import React, { Component } from 'react';

class Feed extends Component {
  render() {
    const item = this.props.item;
    return (
      <div className="feed panel panel-default">
        <div className="panel-heading">
          <h2>
            <a href={item.guid}>{item.title}</a>
          </h2>
          <small>
            {item.dc.creator ? item.dc.creator + '.' : ''} Published on {item.pubDate}.
          </small>
        </div>
        <div className="media panel-body">
          <div className="media-left">
            <img src={item.media.content} className="media-object" />
          </div>
          <div className="media-body">
            {item.description}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
