import React from 'react';
import PropTypes from 'prop-types';

import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import PostItem from 'components/PostItem.jsx';
import './PostList.css';

export default class PostList extends React.Component {
  static propTypes = {
    posts   : PropTypes.array,
    filter  : PropTypes.string,
    onVote  : PropTypes.func
  }

  constructor(props) {
    super(props);

    this.handleVote = this.handleVote.bind(this);
  }

  render() {
    const {posts} = this.props;

    let children = (
      <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
        <div className='empty-text'>
          No post here.   <br />
          Go add some posts.
        </div>
      </ListGroupItem>
    );

    if (posts.length) {
      children = posts.map(p => (
        <ListGroupItem key={p.id} action>
          <PostItem {...p} onVote={this.handleVote} />
        </ListGroupItem>
      ));
    }

    return (
      <div className='post-list'>
        <ListGroup>
          {children}
        </ListGroup>
      </div>
    );
  }

  handleVote(id, mood) {
    this.props.onVote(id, mood);
  }
}
