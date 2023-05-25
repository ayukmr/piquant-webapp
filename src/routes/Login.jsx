import React, { Component } from 'react';

import axios   from 'axios';
import Cookies from 'js-cookie';

// login page
class Login extends Component {
  // handle login
  login = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    // get auth token
    axios.post(`http://localhost:9292/auth/${username}`, { password })
      .then((res) => {
        // set token cookie
        Cookies.set('token', res.data.token);

        // redirect to bookmarks
        window.location = '/bookmarks';
      });
  };

  // mounted component hook
  componentDidMount() {
    if (Cookies.get('token')) {
      window.location = '/bookmarks';
    }
  }

  // render component
  render() {
    return (
      <form className="form" onSubmit={this.login}>
        <div className="form-title">
          log in
        </div>

        {/* username */}
        <div className="form-input">
          <label htmlFor="username">username</label>
          <input type="text" name="username" required />
        </div>

        {/* password */}
        <div className="form-input">
          <label htmlFor="password">password</label>
          <input type="password" name="password" required />
        </div>

        <button className="form-submit" type="submit">
          submit
        </button>

        <div className="form-extra">
          <a href="/create">
            create user
          </a>
        </div>
      </form>
    );
  }
}

export default Login;
