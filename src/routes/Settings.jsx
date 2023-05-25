import React, { Component } from 'react';

import axios   from 'axios';
import Cookies from 'js-cookie';

// user settings
class Settings extends Component {
  // current state
  state = {
    token: Cookies.get('token')
  };

  // generate new token
  generateToken = () => {
    const token = Cookies.get('token');

    if (token) {
      // generate token
      axios.put(
        'http://localhost:9292/token', null,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(({ data }) => {
        const { token } = data;

        Cookies.set('token', token);
        this.setState({ token });
      });
    } else {
      // redirect to login
      window.location = '/login';
    }
  };

  // mounted component hook
  componentDidMount() {
    // redirect if no token is found
    if (!this.state.token) {
      window.location = '/login';
    }
  }

  // render component
  render() {
    const { token } = this.state;

    return (
      <>
        <div className="title">
          user settings
        </div>

        {/* show token */}
        <div>
          token: <code className="settings-token">{token}</code>
        </div>

        {/* generate new token */}
        <button onClick={this.generateToken}>
          generate new token
        </button>

        <br />

        {/* log out */}
        <button
          className="settings-logout"
          onClick={() => {
            Cookies.remove('token');
            window.location = '/login';
          }}
        >
          log out
        </button>
      </>
    );
  }
}

export default Settings;
