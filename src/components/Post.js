import React, { Component } from 'react';

class Post extends Component {
  render() {
    const post = this.props.post;
    const date = post.created_at ? new Date(post.created_at) : new Date();
    return (
      <div className="post">
        <div className="post-index">{ this.props.index + 1 }. </div>
        <div className="post-like">{ post.liked ? 'Unlike' : 'Like' }</div>
        <div className="post-body">
          <a className="post-title" href={post.url} _target="blank">{ post.title }</a>
          <div className="post-details">
            <p>{ post.description }</p>
          </div>
          <div className="post-likes">
            <span>Liked by { post.like_count }</span>
            <span> - </span>
            <span>Created at { date.toLocaleString() }</span>
          </div>
        </div>
      </div>
    );
  };
};

export default Post;
