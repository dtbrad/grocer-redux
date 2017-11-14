import React from 'react';
import { NavLink } from 'react-router-dom';
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
    return <NavItem componentClass="span"><NavLink to="/login">Login</NavLink></NavItem>;
  };

  return (
    <Navbar fluid>
      <Nav>
        <NavItem componentClass="spaced-nav-item" eventKey={1}><NavLink to="/baskets">Shopping History</NavLink></NavItem>
        <NavItem componentClass="spaced-nav-item" eventKey={1}><NavLink to="/products">Products Purchased</NavLink></NavItem>
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
