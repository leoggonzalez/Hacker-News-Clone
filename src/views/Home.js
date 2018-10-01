import React, { Component } from 'react';
import PostsList from './../components/PostsList';
import moment from 'moment';

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
      list = <PostsList posts={posts} loggedUser={this.props.loggedUser} sessionId={ this.props.sessionId }/>
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
