import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <h1>
            Page Not Found :(
          </h1>
        </div>
        <div>
          <h3>
            <Link to={'/'}>Return Home</Link>
          </h3>
        </div>
      </div>
    );
  }
}

export default PageNotFound;