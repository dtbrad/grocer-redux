import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import TokenHelper from './auth/token_helper';

const Navigation = (props) => {

  const LoginStatus = () => {
    if(props.authenticated === true) {
      return (
        <NavDropdown eventKey={3} title={ `Logged in as ${TokenHelper.userName('jwt')}` } id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick = {props.logout}>Logout</MenuItem>
        </NavDropdown>
      )
    }
    else { return <NavItem><Link to={ '/login' }>Login</Link></NavItem> }
  }

  if( props.hideNav === true )

  { return null }

  return (
    <HashRouter>

      <Navbar fluid>
        <Nav>
          <NavItem eventKey={1} href="#"><Link to={ '/baskets' }>Shopping History</Link></NavItem>
        </Nav>
        <Nav pullRight>
          <LoginStatus/>
        </Nav>
    </Navbar>
    </HashRouter>
  );


};

export default Navigation;
