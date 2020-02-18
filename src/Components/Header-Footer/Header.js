import React, { Component } from "react";
import { Navbar } from "react-bulma-components";
import { Link } from "react-router-dom";

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
          style={{ background: "#20BEEE" }}
          fixed="top"
          active={this.state.active}
        >
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="/">
              <Link to="/">
                <span className="nz">Nz</span>
                <span className="mai">Mai</span>
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
            </Navbar.Container>
            <Navbar.Container position="end">
              <Navbar.Item className="social-icon">
                <a
                  href="https://www.instagram.com/nzmai777/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
              </Navbar.Item>
              <Navbar.Item>
                <i className="fab fa-whatsapp" />
                <p>+7-777-348-65-18</p>
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
      </div>
    );
  }
}
