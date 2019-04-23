import React from 'react';
import PropTypes from 'prop-types';

import {Alert} from 'reactstrap';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';

import {getWeather, cancelWeather} from 'api/open-weather-map.js';

import './Today.css';

export default class Today extends React.Component {
  static propTypes = {
    unit: PropTypes.string,
    onUnitChange: PropTypes.func,
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
      // post below
    };

    this.handleWeatherQuery = this.handleWeatherQuery.bind(this);
  }

  componentDidMount() {
    this.getWeather('Hsinchu', this.props.unit);

  }

  render() {
    return (
      <div className={`today weather-bg`}>
        <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
          <WeatherDisplay />
          <WeatherForm />
        </div>
      </div>
    );
  }
}
