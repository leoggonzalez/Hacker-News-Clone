import { LOG_IN_USER, ADD_POST } from '../constants/action-types';

export const logInUser = user => ({
  type: LOG_IN_USER,
  payload: user,
});

export const addPost = post => ({
  type: ADD_POST,
  payload: post,
})