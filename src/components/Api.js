export default {
  async logIn(data) {
    try {
      const resp = await fetch('https://likemachine-api.nerdgeschoss.de/session', {
        method: 'POST',
        body: JSON.stringify({
          facebook_token: data.loggedUser.accessToken,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const sessionId = await resp.json();
      return sessionId;
    } catch (error) {
      throw error;
    }
  },
  async fetchPosts(sessionId) {
    try {
      const headers = new Headers();
      if (sessionId) {
        headers.append('Authorization', `Bearer ${sessionId.id}`);
      }
      const resp = await fetch('https://likemachine-api.nerdgeschoss.de/links', { headers });
      const posts = await resp.json();
      return posts;
    } catch (error) {
      throw error;
    }
  },
  async fetchPost(post, sessionId) {
    try {
      const headers = new Headers();
      if (sessionId) {
        headers.append('Authorization', `Bearer ${sessionId.id}`);
      }
      const resp = await fetch(`https://likemachine-api.nerdgeschoss.de/links/${post.id}`, { headers });
      const updatedPost = await resp.json();
      return updatedPost;
    } catch (error) {
      throw error;
    }
  },
  async addNewPost(url, sessionId) {
    try {
      const headers = new Headers({
        'Content-Type': 'application/json',
      });
      const auth = `Bearer ${sessionId.id}`;
      headers.append('Authorization', auth);

      await fetch('https://likemachine-api.nerdgeschoss.de/links', {
        method: 'POST',
        body: JSON.stringify({
          url,
        }),
        headers,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
  async likePost(post, sessionId) {
    try {
      const headers = new Headers();
      const auth = `Bearer ${sessionId.id}`;
      headers.append('Authorization', auth);
      
      await fetch(`https://likemachine-api.nerdgeschoss.de/links/${post.id}/like`, {
        method: 'POST',
        headers,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
  async unlikePost(post, sessionId) {
    try {
      const headers = new Headers();
      const auth = `Bearer ${sessionId.id}`;
      headers.append('Authorization', auth);
      
      await fetch(`https://likemachine-api.nerdgeschoss.de/links/${post.id}/like`, {
        method: 'DELETE',
        headers,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
  async deletePost(post, sessionId) {
    try {
      const headers = new Headers();
      const auth = `Bearer ${sessionId.id}`;
      headers.append('Authorization', auth);

      await fetch(`https://likemachine-api.nerdgeschoss.de/links/${post.id}`, {
        method: 'DELETE',
        headers,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
};
