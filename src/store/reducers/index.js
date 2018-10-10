import { ADD_POST, LOG_IN_USER } from './../constants/action-types';

const initialState = {
  loggedUser: null,
  posts: [],
  postsLoaded: false,
  postsLoadedWithAuth: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [ ...state.posts, action.payload ] };
      case LOG_IN_USER:
      return { ...state, loggedUser: action.payload };
    default: 
      return state;
  }
};

export default rootReducer;