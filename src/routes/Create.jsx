import React, { Component } from 'react';

import axios   from 'axios';
import Cookies from 'js-cookie';

// create user page
class Create extends Component {
  // handle creating user
  createUser = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    // create new user
    axios.post(`http://localhost:9292/user/${username}`, { password })
      .then((res) => {
        // set token cookie
        Cookies.set('token', res.data.token, { expires: 1 });

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
      <form className="form" onSubmit={this.createUser}>
        <div className="form-title">
          create user
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

        <a className="form-extra" href="/login">
          log in
        </a>
      </form>
    );
  }
}

export default Create;
