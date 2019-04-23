import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Input,
  Button
} from 'reactstrap';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';

import './Main.css';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarToggle: false,
    };

    this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
  }

  render() {
    return (
      <Router>
        <div className="main">
          <div className="container bg-faded">
            <Navbar color="faded" light expand="md">
              <NavbarBrand className="text-info" href="/">WeatherMood</NavbarBrand>
              <NavbarToggler onClick={this.handleNavbarToggle} />
              <Collapse isOpen={this.state.navbarToggle} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/">Today</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/forecast">Forecast</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">Tsung-Han Lee</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>

          <Route exact path="/" render={() => (<Today />)} />
          <Route exact path="/forecast" render={() => (<Forecast />)} />

          <div className="footer">
            Reference: DataLab
          </div>
        </div>
      </Router>
    );
  }

  handleNavbarToggle() {
    this.setState((prevState, props) => ({
      navbarToggle: !prevState.navbarToggle,
    }));
  }
}
