/* index.jsx */
import ReactDOM from 'react-dom';
import React from 'react';

import Main from 'components/Main.jsx';

import PostForm from 'components/PostForm.jsx';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function () {
  ReactDOM.render(
    <div>
      <PostForm />
    </div>,
    document.querySelector('#root')
  );
};
