import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Alert,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import {getMoodIcon} from 'utilities/weather.js';
import './PostForm.css';

export default class PostForm extends React.Component {
  static propTypes = {
    onPost: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      moodToggle: false,
      inputValue: props.city,
      mood: 'na',
      inputDanger: false,
    };

    this.inputEl      = null;
    this.moodToggleEl = null;

    this.handleMoodToggle   = this.handleMoodToggle.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleMoodSelect   = this.handleMoodSelect.bind(this);
    this.handlePost         = this.handlePost.bind(this);
  }

  render() {
    const {inputValue, moodToggle, mood} = this.state;
    const inputDanger = this.inputDanger ? 'has-danger' : '';

    return (
      <div className="post-form">
        <Alert
          color="info"
          className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}
        >
          <div className="mood align-self-start">
            <ButtonDropdown
              type='button'
              isOpen={this.state.moodToggle}
              toggle={this.handleMoodToggle}
            >
              <DropdownToggle
                className='mood-toggle'
                type='button'
                color='secondary'
                caret
              >
                <i className={getMoodIcon(mood)}></i>&nbsp; {
                  mood == 'na' ? 'Mood' : mood
                }
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem type='button' onClick={()=>this.handleMoodSelect('Clear')}>
                  <i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear
                </DropdownItem>
                <DropdownItem type='button' onClick={()=>this.handleMoodSelect('Clouds')}>
                  <i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds
                </DropdownItem>
                <DropdownItem type='button' onClick={()=>this.handleMoodSelect('Drizzle')}>
                  <i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle
                </DropdownItem>
                <DropdownItem type='button' onClick={()=>this.handleMoodSelect('Rain')}>
                  <i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain
                </DropdownItem>
                <DropdownItem type='button' onClick={()=>this.handleMoodSelect('Thunder')}>
                  <i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder
                </DropdownItem>
                <DropdownItem type='button' onClick={()=>this.handleMoodSelect('Snow')}>
                  <i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow
                </DropdownItem>
                <DropdownItem type='button' onClick={()=>this.handleMoodSelect('Windy')}>
                  <i className={getMoodIcon('Windy')}></i>&nbsp;&nbsp;Windy
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>

          <Input
            className='input'
            type="textarea"
            innerRef={el => {this.inputEl=el;}}
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="What's on your mind?"
          />
          <Button
            className='btn-post align-self-end'
            color='info'
            onClick={this.handlePost}
          >
            Post
          </Button>
        </Alert>
      </div>
    );
  }

  handleMoodSelect(mood) {
    this.setState({
      mood : mood,
    });
  }

  handleInputChange(e) {
    let text = e.target.value;
    this.setState({
      inputValue: text,
    });
    if (text) {
      this.setState({inputDanger: false});
    }
  }

  handleMoodToggle(e) {
    this.setState((prevState, props) => ({
      moodToggle: !prevState.moodToggle,
    }));
  }

  handlePost() {
    if (this.state.mood === 'na') {
      this.setState({
        moodToggle: true,
      });
      return;
    }

    if (!this.state.inputValue) {
      this.setState({
        inputDanger:true,
      });
      return;
    }

    this.props.onPost(this.state.mood, this.state.inputValue);
    //  reset to default
    this.setState({
      inputValue: '',
      mood: 'na'
    });
  }
}
