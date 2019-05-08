/* index.jsx */
import ReactDOM from 'react-dom';
import React from 'react';

import Main from 'components/Main.jsx';

import PostItem from 'components/PostItem.jsx';
import PostList from 'components/PostList.jsx';
import Today from 'components/Today.jsx';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function () {
  let ps = [
    {
      id : '1234',
      mood :'Thunder',
      ts: 1556032489,
      text: 'I aint give a fuck!',
      clearVotes: 1,
      cloudsVotes: 2,
      drizzleVotes: 2,
      rainVotes: 3,
      thunderVotes: 4,
      snowVotes: 5,
      windyVotes: 6,
    }, {
      id : '1232',
      mood :'Drizzle',
      ts: 1556042489,
      text: 'I wanna graduate from NTHU',
      clearVotes: 100,
      cloudsVotes: 2,
      drizzleVotes: 2,
      rainVotes: 3,
      thunderVotes: 4,
      snowVotes: 5,
      windyVotes: 6,
    }
  ];

  ReactDOM.render(
    <div>
      <Today
        unit='metric'
        onUnitChange={() => console.log('Changing Unit')}
        searchText=''
      />
    </div>,
    document.querySelector('#root')
  );
};
