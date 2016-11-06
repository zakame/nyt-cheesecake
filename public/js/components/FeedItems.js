import React, { Component } from 'react';
import Feed from './Feed';

const chunk = (array, size) => {
  return array.reduce((chunks, item, i) => {
    i % size === 0 ?
      chunks.push([item]) :
      chunks[chunks.length - 1].push(item);
    return chunks;
  }, []);
}

class FeedItems extends Component {
  componentDidMount = () => {
    document.body.scrollIntoView();
  }
  render() {
    const itemsPerRow = 3;
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
        {chunk(feedItemsNodes, itemsPerRow).map((feedChunk) => (
          <div className="row">
            {feedChunk.map((feed) => (
              <div className="col-md-4">
                {feed}
              </div>
            ))}
          </div>
          ))}
      </div>
    );
  }
}

export default FeedItems;
