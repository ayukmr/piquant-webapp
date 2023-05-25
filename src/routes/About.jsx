import React, { Component } from 'react';

// about page
class About extends Component {
  // render component
  render() {
    return (
      <>
        <div className="title">
          about piquant
        </div>

        <div>piquant is a <a href="//del.icio.us">delicious</a>-like bookmarking service.</div>
        <div>it lacks the public capabilities of delicious, opting to focus on private bookmarking.</div>
        <div>piquant has a query-able api which is easy to use, along with featuring a web service.</div>
      </>
    );
  }
}

export default About;
