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
  loadFeedItems = (id) => {
    this.setState({
      items: []
    })
    NProgress.start();
    axios.get('/nytfeedfun/feeds/' + id)
      .then(response => {
        NProgress.done();
        this.setState({items: response.data.items});
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
  componentDidMount = () => {
    this.loadFeeds();
  }
  render() {
    if (this.props.selected.id) {
      return (
        <div className="container">
          <FeedItems selected={this.props.selected} items={this.state.items} />
        </div>
      )
    }
    else {
      return (
        <div className="container">
          <FeedsList feeds={this.state.feeds} selectFeed={this.props.selectFeed}
                     loadFeedItems={this.loadFeedItems} />
        </div>
      );
    }
  }
}

export default FeedBox;
