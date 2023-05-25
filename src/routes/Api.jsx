import React, { Component } from 'react';

// api page
class Api extends Component {
  // render component
  render() {
    return (
      <>
        <div className="title">
          api docs
        </div>

        {/* bookmark schema */}
        <div className="request">
          bookmark

          <div className="request-description">
            schema for bookmark
          </div>

          <pre className="request-response">
{`{
  "id":    "...",
  "user":  "...",
  "url":   "...",
  "title": "..."
}`}
          </pre>
        </div>

        {/* authenticate user */}
        <div className="request">
          <div>
            <span className="request-type">
              post
            </span>

            <code className="request-path">
              /auth/:username
            </code>
          </div>

          <div className="request-description">
            authenticate user
          </div>

          <pre className="request-response">
{`-> {
  "password": "..."
}

<- {
  "token": "..."
}`}
          </pre>
        </div>

        <div className="request">
          <div>
            <span className="request-type">
              post
            </span>

            <code className="request-path">
              /user/:username
            </code>
          </div>

          <div className="request-description">
            create new user
          </div>

          <pre className="request-response">
{`-> Authorization: ...

<- {
  "token": "..."
}`}
          </pre>
        </div>

        {/* get all bookmarks */}
        <div className="request">
          <div>
            <span className="request-type">
              get
            </span>

            <code className="request-path">
              /bookmarks
            </code>
          </div>

          <div className="request-description">
            get all bookmarks
          </div>

          <pre className="request-response">
{`-> Authorization: ...

<- {
  "bookmarks": [
    bookmark, ...
  ]
}`}
          </pre>
        </div>

        {/* get bookmarks with tag */}
        <div className="request">
          <div>
            <span className="request-type">
              get
            </span>

            <code className="request-path">
              /bookmarks/tag/:tag
            </code>
          </div>

          <div className="request-description">
            get bookmarks with tag
          </div>

          <pre className="request-response">
{`-> Authorization: ...

<- {
  "bookmarks": [
    bookmark, ...
  ]
}`}
          </pre>
        </div>

        {/* create new bookmark */}
        <div className="request">
          <div>
            <span className="request-type">
              post
            </span>

            <code className="request-path">
              /bookmark
            </code>
          </div>

          <div className="request-description">
            create new bookmark
          </div>

          <pre className="request-response">
{`-> Authorization: ...

<- {
  "id": "..."
}`}
          </pre>
        </div>

        {/* update bookmark */}
        <div className="request">
          <div>
            <span className="request-type">
              patch
            </span>

            <code className="request-path">
              /bookmark/:bookmark_id
            </code>
          </div>

          <div className="request-description">
            update bookmark
          </div>

          <pre className="request-response">
{`-> Authorization: ...

<- {
  "id": "..."
}`}
          </pre>
        </div>

        {/* delete bookmark */}
        <div className="request">
          <div>
            <span className="request-type">
              delete
            </span>

            <code className="request-path">
              /bookmark/:bookmark_id
            </code>
          </div>

          <div className="request-description">
            delete bookmark
          </div>

          <pre className="request-response">
{`-> Authorization: ...

<- {
  "id": "..."
}`}
          </pre>
        </div>
      </>
    );
  }
}

export default Api;
