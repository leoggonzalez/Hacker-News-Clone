# LikeMachine

Due to the big success of [Hacker News](https://news.ycombinator.com) it's time to do the most awesome copycat ever. This application needs 

- a social login via Facebook
- a homepage that has a form for logged in users allowing them to post a link (containing a url)
- a list of posted links on the homepage, grouped by day (newest day first), sorted by highest like-count within each day (visible without login)
    - clicking on a title will open the url in a new window/tab
    - the list should display the like count and some meta data
- a like button on each link to upvote that url (only visible for logged in users)
    - users will like a lot of links, therefore there should be no page reload after clicking on like
    - you can use an emoji heart as the like button and the broken heart to remove the like
    - a successfull like should be confirmed by a short css-based animation (heart jumping or pulsing)
    - users can like a post only once 
- the owner of a post can delete that post
- (__optional__) display a thumbnail and/or description text in the list if the url contains corresponding open graph and/or twitter card information
- (__optional__) update the like count while the user is browsing the list
    - you can use the SSE API or polling

## Conditions

- The technology stack should be React. You can chose your favorite version and libraries, pre-release is ok as well.
- Do not reinvent the wheel. Using libraries is a good thing!
- The optional tasks are optional. Doing it won't affect your grading. But if you do it, it will be judged as part of the overall application quality.
- Create this app in a your GitHub-Account and deploy a demo version to Heroku.
- This is just a prototype and doesn't have to be production ready. It should be fun, so go crazy with your ideas.

# API Documentation

The API is a JSON based REST API available at `https://likemachine-api.nerdgeschoss.de`. You can see
the source code on GitHub if you're interested.

## Authorization

If endpoints need authorization, you have to supply a session id via an `Authentication` header. To
get your session id, authorize your user against facebook to get a facebook access token with the scopes
of `public_profile,email` and send it to `POST /session` with a body of `{"facebook_token": "YOUR_TOKEN_HERE"}`.

To logout, you can just `DELETE /session`.

During tests you can use a testing account:

```
Authorization: Bearer 00000000-0000-0000-0000-000000000000
```

## Viewing, creating and deleting links

A link looks like this:

```json
{
    "id": "8b6bc2a2-31b8-40fa-a8ac-9481d2745acf",
    "url": "http://nerdgeschoss.de",
    "title": "nerdgeschoss",
    "description": "We're a product development studio, busy designing and building tomorrow's apps.",
    "image_url": "https://nerdgeschoss.de/de9b1b02ad130cc0c842cda20352c713.svg",
    "created_at": "2018-09-05T10:02:38.195Z",
    "updated_at": "2018-09-05T10:08:12.736Z",
    "liked": false,
    "like_count": 0,
    "owned": true
}
```

where `liked` signals that this link is liked by the currently logged in user (therefore it's always false if you don't supply a session id) and `owned` signals that the current user has editing rights on this link.

### `GET /links`
an array of links

With the corresponding content type you can also use this endpoint as an event stream to get notified about changes to links in real time. In this case there will be a `change` event with the whole link object as a payload.

### `GET /links/:id`
only this specific link

### `POST /links`
arguments
- `url` _string, required_

Metadata might not immediately be available as parsing of the website can be delayed by some seconds. Observe the event source for updated data.

### `DELETE /links/:id`
Deletes the specified link. Only the owner can do this.

## Liking and Unliking a Link
### `POST /links/:id/like`
likes the specified link and notifies observers via the event stream. Liking an already liked post results in a 422 error.

### `DELETE /links/:id/like`
ulikes the specified link and notifies observers via the event stream. Unliking a post that has not been liked results in a 404 error.

