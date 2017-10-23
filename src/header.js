import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = (props) => {

  const LoginStatus = () => {
    if(props.isAuthenticated === true) {
      return (
        <NavDropdown eventKey={3} title={ `Logged in as ${ props.user_name }` } id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick = {props.logout}>Logout</MenuItem>
        </NavDropdown>
      )
    }
    else { return <NavItem><Link to={ '/login' }>Login</Link></NavItem> }
  }

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

export default Header;
