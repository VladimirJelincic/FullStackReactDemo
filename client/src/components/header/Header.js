import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import './header.css';

class Header extends Component {
  componentWillMount = () => {
    fetch('/most-liked')
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  };

  renderLinks() {
    const links = [
      <LinkContainer key="navitem_1" to="/users" activeClassName="">
        <NavItem>Users</NavItem>
      </LinkContainer>
    ];
    if (this.props.authenticated && this.props.user) {
      links.push(
        ...[
          <LinkContainer key="navitem_2" to="/me" activeClassName="">
            <NavItem>My Profile</NavItem>
          </LinkContainer>,
          <LinkContainer key="navitem_3" to="/logout" activeClassName="">
            <NavItem>Log Out</NavItem>
          </LinkContainer>
        ]
      );
    } else {
      links.push(
        ...[
          <LinkContainer key="navitem_2" to="/login" activeClassName="">
            <NavItem>Login</NavItem>
          </LinkContainer>,
          <LinkContainer key="navitem_3" to="/signup" activeClassName="">
            <NavItem>Sign Up</NavItem>
          </LinkContainer>
        ]
      );
    }
    return links;
  }

  render() {
    return (
      <Navbar collapseOnSelect fluid style={{ width: '100%' }}>
        <Navbar.Header>
          <Navbar.Brand>
            <img
              alt="FullStackReact"
              className="pull-left"
              src="/logo.svg"
              style={{ width: '150px', height: '41px', padding: '2px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>{this.renderLinks()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    // authenticated: state.auth.authenticated,
    // user: state.auth.user
  };
}
export default connect(mapStateToProps)(Header);
