import React from 'react';
import PropTypes from 'prop-types';

import {Alert} from 'reactstrap';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';

import {getWeather, cancelWeather} from 'api/open-weather-map.js';
import {listPosts, createPost, createVote} from 'api/posts.js';

import './Today.css';

export default class Today extends React.Component {
  static propTypes = {
    unit: PropTypes.string,
    onUnitChange: PropTypes.func,
    searchText: PropTypes.string,
  };

  static getInitWeatherState() {
    return {
      city: 'na',
      code: -1,
      group: 'na',
      description: 'N/A',
      temp: NaN,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      ...Today.getInitWeatherState(),
      weatherLoading: false,
      masking: false,
      postLoading: false,
      posts: []
    };

    this.handleWeatherQuery = this.handleWeatherQuery.bind(this);
    this.handleCreatePost   = this.handleCreatePost.bind(this);
    this.handleCreateVote   = this.handleCreateVote.bind(this);
  }

  componentWillUnmount() {
    if (this.state.weatherLoading) {
      cancelWeather();
    }
  }

  componentDidMount() {
    this.getWeather('Hsinchu', this.props.unit);
    this.listPosts(this.props.searchText);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchText !== this.props.searchText) {
      this.listPosts(nextProps.searchText);
    }
  }

  render() {
    const {unit} = this.props;
    const {group, city, masking, posts, postLoading} = this.state;

    document.body.className = `weather-bg ${group}`;
    document.querySelector('.weather-bg .mask').className = `mask ${masking? 'masking' : ''}`;

    return (
      <div className="today">
        <div className="weather">
          <WeatherForm city={city} unit={unit} onQuery={this.handleWeatherQuery} />
          <WeatherDisplay {...this.state} day="today" />
        </div>
        <div className="posts">
          <PostForm onPost={this.handleCreatePost} />
          <PostList posts={posts} onVote={this.handleCreateVote} /> {
            postLoading &&
            <Alert color="warning" className="loading">Loading ...</Alert>
          }
        </div>
      </div>
    );
  }

  getWeather(city, unit) {
    this.setState({
      weatherLoading: true,
      masking: true,
      city: city,     //  set city immediately to prevent input text (In Weather Form) from blinking
    }, () => {        //  callback after setState done
      getWeather(city, unit).then((weather) => {
        this.setState({
          ...weather,
          weatherLoading: false,
        }, () => this.notifyUnitChange(unit));
      }).catch(err => {
        console.error('Error Getting Weather', err);
        this.setState({
          ...Today.getInitWeatherState(unit),
          weatherLoading: false,
        }, () => this.notifyUnitChange(unit));
      });
    });

    setTimeout(() => {
      this.setState({
        masking: false,
      });
    }, 600);
  }

  listPosts(searchText) {
    this.setState({
      postLoading: true,
    }, () => {
      listPosts(searchText).then(posts => {
        this.setState({
          posts,
          postLoading: false,
        });
      }).catch(err => {
         console.error('Error Listing posts', err);

         this.setState({
           posts: [],
           postLoading: false,
         });
       })
    });
  }

  handleWeatherQuery(city, unit) {
    this.getWeather(city, unit);
  }

  notifyUnitChange(unit) {
    if (this.props.unit !== unit) {
      this.props.onUnitChange(unit);
    }
  }

  handleCreatePost(mood, text) {
    createPost(mood, text).then(() => {
      this.listPosts(this.props.searchText);
    }).catch(err => {
      console.error('Error Creating Post');
    });
  }

  handleCreateVote(id, mood) {
    createVote(id, mood).then(() => {
      this.listPosts(this.props.searchText);
    }).catch(err => {
      console.error('Error Creating Vote');
    });
  }
}
