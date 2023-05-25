import React, { Component } from 'react';

import { Outlet } from 'react-router-dom';
import Cookies    from 'js-cookie';

import logo from '/logo.png';

// root
class Root extends Component {
  // render component
  render() {
    return (
      <>
        <div id="header-wrapper">
          <nav id="header">
            <div>
              {/* branding */}
              <a href="/">
                <img id="header-logo" src={logo} />

                <div id="header-title">
                  piquant
                </div>
              </a>

              {/* info pages */}
              <a className="header-link" href="/about">about</a>
              <a className="header-link" href="/api">api</a>
              <a className="header-link" href="/contact">contact</a>
            </div>

            <div id="header-right">
              {/* app pages */}
              {Cookies.get('token')
                ? <>
                  <a className="header-link" href="/bookmarks">bookmarks</a>
                  <a className="header-link" href="/settings">settings</a>
                </>
                : <a className="header-link" href="/login">log in</a>
              }
            </div>
          </nav>
        </div>

        <div id="content">
          {/* render outlet */}
          <Outlet />
        </div>
      </>
    );
  }
}

export default Root;
