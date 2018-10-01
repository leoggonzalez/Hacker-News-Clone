import React, { Component } from 'react';
import api from './Api';

class Post extends Component {
  constructor(props) {
    super(props);
    this.likePost = this.likePost.bind(this);
  }
  unlikePost() {
    alert('like post');
  }
  likePost() {
    api.likePost(this.props.post, this.props.sessionId);
  }

  render() {
    const post = this.props.post;
    const date = post.created_at ? new Date(post.created_at) : new Date();

    let like;
    if (this.props.loggedUser) {
      if (post.liked) {
        like = <div className="post-like" onClick={this.unlikePost}>Unlike</div>
      } else {
        like = <div className="post-like" onClick={this.likePost}>Like</div>
      }
    }

    return (
      <div className="post">
        <div className="post-index">{ this.props.index + 1 }. </div>
        { like }
        <div className="post-body">
          <a className="post-title" href={post.url} target="_blank">{ post.title }</a>
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
