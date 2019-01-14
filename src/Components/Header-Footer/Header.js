import React, { Component } from 'react';
import { Navbar } from 'react-bulma-components';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  // set active state for hamburger
  state = { active: false };

  handleClick = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };
  render() {
    return (
      <div id="header">
        <Navbar
          style={{ background: '#20BEEE' }}
          fixed="top"
          active={this.state.active}
        >
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="/">
              <Link to="/">
                <img src="https://i.imgur.com/9jQaBuq.png" alt="Dew Ventures" />
              </Link>
            </Navbar.Item>
            <Navbar.Burger
              active={this.state.active}
              onClick={this.handleClick}
            />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container>
              <Navbar.Item>
                <Link to="/my_experience">Career</Link>
              </Navbar.Item>
              <Navbar.Item>
                <Link to="/my_education">Education</Link>
              </Navbar.Item>
              <Navbar.Item>
                <Link to="/projects">Projects</Link>
              </Navbar.Item>
              <Navbar.Item>
                <Link to="/services">Services</Link>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
      </div>
    );
  }
}
