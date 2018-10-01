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
      console.log(error);
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
      return error;
    }
  },
  async addNewPost(url, sessionId) {
    try {
      const headers = new Headers({
        'Content-Type': 'application/json',
      });
      const auth = `Bearer ${sessionId.id}`;
      headers.append('Authorization', auth);

      let resp = await fetch('https://likemachine-api.nerdgeschoss.de/links', {
        method: 'POST',
        body: JSON.stringify({
          url,
        }),
        headers,
      });
      const resp2 = await resp.json();
      debugger;
      return resp2;
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  },
};
