// -*- mode: js2-jsx -*-
import React, { Component } from 'react';

import NavBar from './NavBar';
import FeedBox from './FeedBox';
import Footer from './Footer';

class App extends Component {
  state = {
    selected: {}
  }
  selectFeed = (feed) => {
    this.setState({selected: feed});
  }
  render() {
    return (
      <div>
        <NavBar selected={this.state.selected} selectFeed={this.selectFeed} />
        <FeedBox selected={this.state.selected} selectFeed={this.selectFeed} />
        <Footer />
      </div>
    );
  }
}

export default App;
