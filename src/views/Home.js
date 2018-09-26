import React, { Component } from 'react';
import PostsList from './../components/PostsList';

class Home extends Component {
  render() {
    let list;
    if (this.props.posts.length > 0) {
      list = <PostsList posts={this.props.posts} />
    } else {
      list = <p>Loading...</p>
    }
    return (
      <div className="news">
        { list }
      </div>
    );
  };
};

export default Home;
