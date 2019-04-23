import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import './WeatherForm.css';

export default class WeatherForm extends React.Component {
  static propTypes = {
    city: PropTypes.string,
    unit: PropTypes.string,
    onQuery: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      unitToggle: false,
      inputValue: props.city,
      unit: props.unit,
      formToggle: false,
    };

    this.inputEl = null;

    this.handleUnitToggle   = this.handleUnitToggle.bind(this);
    this.handleMetricUnit   = this.handleMetricUnit.bind(this);
    this.handleImperialUnit = this.handleImperialUnit.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleFormToggle   = this.handleFormToggle.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  render() {
    const form = this.state.formToggle ? 'form' : '';
    return (
      <div className={`weather-form ${form}`}> { this.state.formToggle ?
        <Form
          className="form-inline justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <Input
            type="text"
            name="city"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            innerRef={el => {this.inputEl=el}}
          />

          <ButtonDropdown isOpen={this.state.unitToggle} toggle={this.handleUnitToggle}>
            <DropdownToggle caret>
              &ordm; {this.state.unit == 'metric' ? 'C' : 'F'}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.handleMetricUnit}>&ordm; C</DropdownItem>
              <DropdownItem onClick={this.handleImperialUnit}>&ordm; F</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown> &nbsp;

          <Button className="info">Check</Button>
        </Form>
        :
        <Button
          className="btn-form"
          onClick={this.handleFormToggle}
          outline
          color="secondary"
        >
          <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;{this.props.city}
        </Button>
      }
      </div>
    );
  }

  handleMetricUnit() {
    this.setState({
      unit: 'metric'
    });
  }

  handleImperialUnit() {
    this.setState({unit: 'imperial'});
  }

  handleUnitToggle() {
    this.setState((prevState, props) => ({
      unitToggle: !prevState.unitToggle,
    }));
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleFormToggle() {
    this.setState((prevState, props) => ({
      formToggle: !prevState.formToggle,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    this.inputEl.blur();
    if (this.state.inputValue && this.state.inputValue.trim()) {
      this.props.onQuery(this.state.inputValue, this.state.unit);
      this.handleFormToggle();
    } else {
      // this.state.inputValue = this.props.city;
      this.setState({
        inputValue: this.props.city,
      });
    }
  }
}
