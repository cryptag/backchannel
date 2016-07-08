import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  render(){
    return (
      <div className="navigation">
        <div className="logo">

          <h1>Backchannel_</h1>
        </div>

        <nav>
          <div className="tab">
            <a href="#"><i className="fa fa-2x fa-globe"></i></a>
          </div>
          <div className="tab">
            <Link to="/"><i className="fa fa-2x fa-comment-o"></i></Link>
          </div>
          <div className="tab">
            <a href="#"><i className="fa fa-2x fa-users"></i></a>
          </div>
          <div className="tab">
            <Link to="/settings"><i className="fa fa-2x fa-cog"></i></Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
