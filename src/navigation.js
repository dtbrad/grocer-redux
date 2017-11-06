import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TokenHelper from './auth/token_helper';

const Navigation = (props) => {
  const LoginStatus = () => {
    if (props.authenticated === true) {
      return (
        <NavDropdown eventKey={3} title={`Logged in as ${TokenHelper.userName('jwt')}`} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick={props.logout}>Logout</MenuItem>
        </NavDropdown>
      );
    }
    return <NavItem componentClass="span"><Link to="/login">Login</Link></NavItem>;
  };

  return (
    <Navbar fluid>
      <Nav>
        <NavItem componentClass="span" eventKey={1}><Link to="/baskets">Shopping History</Link></NavItem>
      </Nav>
      <Nav pullRight>
        <LoginStatus />
      </Nav>
    </Navbar>
  );
};

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navigation;
