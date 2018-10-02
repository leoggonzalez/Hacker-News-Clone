import React, { Component } from 'react';
import Post from './Post';
import './../assets/styles/PostsList.scss';

class PostsList extends Component {
  renderList(array) {
    return array
      .sort((a, b) => {
        if (a.like_count < b.like_count) return 1;
        if (a.like_count > b.like_count) return -1;
        return 0;
      })
      .map((d, i) => {
        return (
          <li key={i}>
            <Post index={i} post={d}
              loggedUser={this.props.loggedUser} 
              sessionId={ this.props.sessionId }
              onDelete={ this.props.onDelete } 
            />
          </li>
        )
      });
  }

  render() {
    const days = this.props.posts.map((day, i) => {
      return (
        <div className="posts-day" key={i}>
          <header className="posts-day__header">
            { day.date.format("MMMM Do, YYYY") }
          </header>
          <ul className="posts-day__list">
            { this.renderList(day.posts) }
          </ul>
        </div>
      );
    });
    return (
      <ul className="posts-list">
        {days}
      </ul>
    );
  };
};

export default PostsList;
