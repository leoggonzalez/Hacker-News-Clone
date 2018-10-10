import React, { Component } from 'react';
import { connect } from 'react-redux';  
import moment from 'moment';
import PostsList from './../components/PostsList';
import { addPost } from './../store/actions/index';
import api from './../components/Api';

const mapDispatchToProps = dispatch => {
  return {
    addPost: post => dispatch(addPost(post)),
  }
}

const mapStateToProps = state => {
  return { 
    posts: state.posts, 
    loggedUser: state.loggedUser,
    postsLoaded: state.postsLoaded,
    postsLoadedWithAuth: state.postsLoadedWithAuth,
  }
}

function groupByDay(array) {
  const group = [];
  array.forEach((post) => {
    const date = moment(post.created_at);
    const exists = group.find(item => item.date.isSame(date, 'day'));
    if (exists) {
      exists.posts.push(post);
    } else {
      group.push({
        date,
        posts: [post],
      });
    }
  });
  return group;
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentWillMount() {
    this.fetchPosts();
    // events
    const source = new EventSource('https://likemachine-api.nerdgeschoss.de/links');
    source.addEventListener('change', (e) => {
      const data = JSON.parse(e.data);
      this.fetchPost(data.link);
    }, false);
  }

  async fetchPost(post) {
    const updatedPost = await api.fetchPost(post, this.state.sessionId);
    const posts = [...this.props.posts];
    for (let i = 0; i < posts.length; i += 1) {
      if (posts[i].id === updatedPost.id) posts[i] = updatedPost;
    }
    this.setState({
      posts,
    });
  }

  async fetchPosts() {
    const { loggedUser, postsLoadedWithAuth, postsLoaded } = this.props; 
    try {
      let posts = [];
      if (loggedUser && !postsLoadedWithAuth) {
        api.clearPosts();
        posts = await api.fetchPosts(loggedUser.sessionId);
      } else if (!postsLoaded) {
        posts = await api.fetchPosts();
      }
      posts.forEach((post) => {
        this.props.addPost(post);
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let list;
    if (this.props.posts.length > 0) {
      let posts = this.props.posts.slice(0);
      posts = groupByDay(posts).sort((a, b) => {
        if (a.date.isBefore(b.date)) return 1;
        if (a.date.isAfter(b.date)) return -1;
        return 0;
      });
      list = (
        <PostsList posts={posts}
          loggedUser={this.props.loggedUser}
          sessionId={ this.props.sessionId }
          onDelete={this.props.onDelete}
        />
      )
    } else if (this.props.loadFailed) {
      list = <p className="home-loading">Failed to load. Press refresh the page.</p>
    } else {
      list = <p className="home-loading">Loading posts...</p>
    }
    return (
      <div className="news">
        { list }
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
