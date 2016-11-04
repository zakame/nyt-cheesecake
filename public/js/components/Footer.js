import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">
            Made for learning by <a href="http://zakame.net">Zak B. Elep</a>. Built with <a href="http://mojolicio.us">Mojolicious</a> and <a href="https://facebook.github.io/react">ReactJS</a>. Code licensed under <a href="https://github.com/zakame/nyt-cheesecake/blob/master/README.md">The MIT License</a>.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
