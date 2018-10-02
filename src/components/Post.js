import React, { Component } from 'react';
import api from './Api';
import heartEmpty from './../assets/heart-empty.svg';
import heartFull from './../assets/heart-full.svg';
import loadingIcon from './../assets/loading.svg';

class Post extends Component {
  constructor(props) {
    super(props);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.state = {
      loading: false,
    }
  }
  async unlikePost() {
    this.setState({ loading: true });
    try {
      await api.unlikePost(this.props.post, this.props.sessionId);
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  }
  async likePost() {
    this.setState({ loading: true });
    try {
      await api.likePost(this.props.post, this.props.sessionId);
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  }
  async deletePost() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.deletePost(this.props.post, this.props.sessionId);
        this.props.onDelete(this.props.post);
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const post = this.props.post;
    const date = post.created_at ? new Date(post.created_at) : new Date();

    let like;
    if (this.props.loggedUser) {
      if (this.state.loading) {
        like = (
          <div className="post-like">
            <img className="post-like__icon loading-icon" src={loadingIcon} alt="Loading"/>
          </div>)
      } else if (post.liked) {
        like = (
          <div className="post-like post-unlike" onClick={this.unlikePost}>
            <img className="post-like__icon animated rubberBand" src={heartFull} alt="Unlike"/>
          </div>)
      } else {
        like = (
          <div className="post-like" onClick={this.likePost}>
            <img className="post-like__icon" src={heartEmpty} alt="Like"/>
          </div>
        )
      }
    }

    let deletePost;
    if (this.props.loggedUser && post.owned) {
      deletePost = (
        <span className="post-delete"> - <strong onClick={this.deletePost}> Delete post</strong></span>
      )
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
            { deletePost }
          </div>
        </div>
      </div>
    );
  };
};

export default Post;
