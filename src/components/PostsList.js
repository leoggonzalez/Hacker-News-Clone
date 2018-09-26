import React, { Component } from 'react';
import Post from './Post';
import './../assets/styles/PostsList.scss';

class PostsList extends Component {
  render() {
    const listItems = this.props.posts.map((d, i) => <li key={i}><Post index={i} post={d} /></li>);
    return (
      <ul className="posts-list">
        {listItems}
      </ul>
    );
  };
};

export default PostsList;
