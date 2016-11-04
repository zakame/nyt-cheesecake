import React, { Component } from 'react';

import 'bootstrap/js/transition';
import 'bootstrap/js/collapse';

class NavBar extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.selectFeed({});
  }
  render() {
    const home = this.props.selected. id === undefined ? 'NYTFeedFun' : '< Back to Feeds';
    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                    data-toggle="collapse" data-target="#navCollapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="" onClick={this.handleClick}>{home}</a>
          </div>
          <div id="navCollapsed" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href="https://github.com/zakame/nyt-cheesecake">Github</a></li>
              <li><a href="https://twitter.com/zakame">@zakame</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
