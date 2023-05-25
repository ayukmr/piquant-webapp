import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios   from 'axios';
import Cookies from 'js-cookie';

import { GoTrashcan } from 'react-icons/go';
import { TfiPencil }  from 'react-icons/tfi';

import Modal from '../Modal';

// bookmarks viewer
class Bookmarks extends Component {
  // define prop types
  static propTypes = {
    loader: PropTypes.func,
    title:  PropTypes.string
  };

  // current state
  state = {
    bookmarks:        [],
    addingBookmark:   false,
    updatingBookmark: null
  };

  // load data
  loadData = () => {
    this.props.loader()
      .then((res) => {
        const { bookmarks } = res.data;
        this.setState({ bookmarks });
      });
  };

  // set updating bookmark key
  setUpdatingBookmarkKey = ({ target }, key) => {
    const { updatingBookmark } = this.state;

    updatingBookmark[key] = target.value;
    this.setState({ updatingBookmark });
  };

  // add bookmark
  addBookmark = (e) => {
    const { target } = e;
    e.preventDefault();

    const title = target.title.value;
    const url   = target.url.value;

    // get bookmark tags
    const tags =
      target.tags.value
        ? target.tags.value.replace(/ /g, '').split(',')
        : [];

    const token = Cookies.get('token');

    if (token) {
      // post bookmark
      axios.post(
        'http://localhost:9292/bookmark',
        { title, url, tags },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(this.loadData);

      this.setState({ addingBookmark: false });
    } else {
      // redirect to login
      window.location = '/login';
    }
  };

  // update bookmark
  updateBookmark = (e) => {
    const { target } = e;
    e.preventDefault();

    const title = target.title.value;
    const url   = target.url.value;

    // get bookmark tags
    const tags =
      target.tags.value
        ? target.tags.value.replace(/ /g, '').split(',')
        : [];

    const token = Cookies.get('token');

    if (token) {
      const { updatingBookmark } = this.state;

      // patch bookmark
      axios.patch(
        `http://localhost:9292/bookmark/${updatingBookmark.id}`,
        { title, url, tags },
        { headers: { Authorization: `Bearer ${token}` } }
    ).then(this.loadData);

      this.setState({ updatingBookmark: null });
    } else {
      // redirect to login
      window.location = '/login';
    }
  };

  // delete bookmark
  deleteBookmark = (id) => {
    const token = Cookies.get('token');

    if (token) {
      // delete bookmark
      axios.delete(
        `http://localhost:9292/bookmark/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(this.loadData);

      this.setState({ updatingBookmark: null });
    } else {
      // redirect to login
      window.location = '/login';
    }
  };

  // mounted component hook
  componentDidMount() {
    this.loadData();
  }

  // render component
  render() {
    const { bookmarks, addingBookmark, updatingBookmark } = this.state;

    return (
      <>
        <div className="title">
          {this.props.title}
        </div>

        {/* show bookmarks */}
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bookmark">
            <span className="bookmark-title">
              {bookmark.title}
            </span>

            <div className="bookmark-info">
              <a href={bookmark.url} target="_blank" rel="noreferrer">{bookmark.url}</a>

              {bookmark.tags.length ? ' •' : ''}

              {/* format tags */}
              {bookmark.tags.map((tag) => (
                <span key={`${bookmark.id}${tag}`}>
                  {' '}
                  <a href={`/bookmarks/tag/${tag}`}>
                    #{tag}
                  </a>
                </span>
              ))}
            </div>

            <div
              className="bookmark-button"
              onClick={() => this.deleteBookmark(bookmark.id)}
            >
              <GoTrashcan />
            </div>

            <div
              className="bookmark-button"
              onClick={() => {
                this.setState({
                  updatingBookmark: {
                    ...bookmark,
                    tags: bookmark.tags.join(',')
                  }
                });
              }}
            >
              <TfiPencil />
            </div>

            <hr />
          </div>
        ))}

        {/* add bookmark */}
        <button
          onClick={() => {
            this.setState({ addingBookmark: !addingBookmark });
          }}
        >
          add bookmark
        </button>

        <Modal
          show={addingBookmark}
          onClose={() => this.setState({ addingBookmark: false })}
        >
          <form className="form" onSubmit={this.addBookmark}>
            <div className="form-title">
              add bookmark
            </div>

            {/* bookmark title */}
            <div className="form-input">
              <label htmlFor="title">title</label>
              <input type="text" name="title" required />
            </div>

            {/* bookmark url */}
            <div className="form-input">
              <label htmlFor="url">link</label>
              <input type="url" name="url" required />
            </div>

            {/* bookmark tags */}
            <div className="form-input">
              <label htmlFor="tags">tags</label>
              <input type="text" name="tags" />
            </div>

            <button className="form-submit" type="submit">
              submit
            </button>
          </form>
        </Modal>

        <Modal
          show={updatingBookmark}
          onClose={() => this.setState({ updatingBookmark: null })}
        >
          {updatingBookmark &&
            <form className="form" onSubmit={this.updateBookmark}>
              <div className="form-title">
                update bookmark
              </div>

              {/* bookmark title */}
              <div className="form-input">
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  name="title"
                  value={updatingBookmark.title}
                  onChange={(e) => this.setUpdatingBookmarkKey(e, 'title')}
                  required
                />
              </div>

              {/* bookmark url */}
              <div className="form-input">
                <label htmlFor="url">link</label>
                <input
                  type="url"
                  name="url"
                  value={updatingBookmark.url}
                  onChange={(e) => this.setUpdatingBookmarkKey(e, 'url')}
                  required
                />
              </div>

              {/* bookmark tags */}
              <div className="form-input">
                <label htmlFor="tags">tags</label>
                <input
                  type="text"
                  name="tags"
                  value={updatingBookmark.tags}
                  onChange={(e) => this.setUpdatingBookmarkKey(e, 'tags')}
                />
              </div>

              <button className="form-submit" type="submit">
                submit
              </button>
            </form>
          }
        </Modal>
      </>
    );
  }
}

export default Bookmarks;
