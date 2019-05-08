import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const postKey = 'posts';

/**
 * List Posts
 * @param {string} searchText The first number.
 * @return {Promise} The sum of the two numbers.
 */
export function listPosts(searchText='') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_listPosts(searchText));
    }, 600);
  });
}

/**
 * Simulate server side List Posts
 * @param {string} searchText The first number.
 * @return {Array} The sum of the two numbers.
 */
function _listPosts(searchText = '') {
  let postString = localStorage.getItem(postKey);
  let posts = postString ? JSON.parse(postString) : [];

  if (posts.length > 0 && searchText) {
    posts = posts.filter((p) => {
      return p.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });
  }

  return posts;
}

/**
 * create Post
 * @param {string}  mood The first number.
 * @param {string} text The first number.
 * @return {Promise} The sum of the two numbers.
 */
export function createPost(mood, text) {
  return new Promise((resolve, reject) => {
    resolve(_createPost(mood, text));
  });
}

/**
 * Simulate server side create Post
 * @param {string}  mood The first number.
 * @param {string} text The first number.
 * @return {Object} The sum of the two numbers.
 */
function _createPost(mood, text) {
  const newPost = {
    id: uuid(),
    mood: mood,
    text: text,
    ts: moment().unix(),
    clearVotes: 0,
    cloudsVotes: 0,
    drizzleVotes: 0,
    rainVotes: 0,
    thunderVotes: 0,
    snowVotes: 0,
    windyVotes: 0,
  }

  const posts = [
    newPost,
    ..._listPosts()
  ]

  localStorage.setItem(postKey, JSON.stringify(posts));

  return newPost;
}

/**
 * create Vote
 * @param {string} id The first number.
 * @param {string} mood The first number.
 * @return {Promise} The sum of the two numbers.
 */
export function createVote(id, mood) {
  return new Promise((resolve, reject) => {
    resolve(_createVote(id, mood));
  });
}

/**
 * Simulate server side create Vote
 * @param {string} id The first number.
 * @param {string} mood The first number.
 */
function _createVote(id, mood) {
  const posts = _listPosts().map((p) => {
    //  only modify the exact id post
    if (p.id === id) {
      ++p[mood.toLowerCase() + 'Votes'];
    }
    return p;
  });

  localStorage.setItem(postKey, JSON.stringify(posts));
}
