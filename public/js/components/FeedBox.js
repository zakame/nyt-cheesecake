// -*- mode: js2-jsx -*-
import 'nprogress/nprogress.css';

import axios from 'axios';
import NProgress from 'nprogress';
import React, { Component } from 'react';

import FeedItems from './FeedItems';
import FeedsList from './FeedsList';

class FeedBox extends Component {
  state = {
    feeds: [],
    items: [],
  }
  loadFeeds = () => {
    NProgress.start();
    axios.get('/nytfeedfun/feeds/list')
      .then(response => {
        NProgress.done();
        this.setState({feeds: response.data});
      })
      .catch(error => {
        NProgress.done();
        if (error.response) {
          console.error('Error getting feed list: ',
                        error.response.status, error.response.data);
        }
        else {
          console.error(error.message);
        }
      });
  }
  loadFeedItems = (feed) => {
    this.setState({items: []});
    NProgress.start();
    axios.get('/nytfeedfun/feeds/' + feed.id)
      .then(response => {
        NProgress.done();
        this.setState({items: response.data.items});
        this.props.selectFeed(feed);
      })
      .catch(error => {
        NProgress.done();
        if (error.response) {
          console.error('Error gettind feed: ',
                        error.response.status, error.response.data);
        }
        else {
          console.error(error.message);
        }
      });
  }
  render() {
    const feedsList = (
      <FeedsList feeds={this.state.feeds} selectFeed={this.props.selectFeed}
                 loadFeeds={this.loadFeeds} loadFeedItems={this.loadFeedItems} />
    );
    const feedItems = (
      <FeedItems selected={this.props.selected} items={this.state.items} />
    );
    return (
      <div className="container">
        {this.props.selected.id === undefined ? feedsList : feedItems}
      </div>
    );
  }
}

export default FeedBox;
