import React, { Component } from 'react';
import { connect } from 'react-redux';  
import PostsList from './../components/PostsList';
import moment from 'moment';

const mapStateToProps = state => {
  return { posts: state.posts }
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

export default connect(mapStateToProps)(Home);
