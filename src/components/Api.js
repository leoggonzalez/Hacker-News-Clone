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
  async fetchPosts() {
    try {
      const resp = await fetch('https://likemachine-api.nerdgeschoss.de/links');
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
      headers.append('Authentication', sessionId.id);

      let resp = await fetch('https://likemachine-api.nerdgeschoss.de/links', {
        method: 'POST',
        body: JSON.stringify({
          url,
        }),
        headers,
      });
      debugger;
      const resp2 = await resp.json();
      debugger;
      return resp2;
    } catch (error) {
      console.log(error);
    }
  },
};
