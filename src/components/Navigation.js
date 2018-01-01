import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import TokenHelper from '../api/TokenHelper';

const Navigation = withRouter(({ authenticated, logOut, history }) => {
  const username = TokenHelper.userName('jwt');
  const handleLogOut = async () => {
    await logOut();
    history.push('/welcome');
  };

  return authenticated ? (
    <Navbar fluid>
      <Nav>
        <LinkContainer eventKey={1} exact to="/products">
          <NavItem eventKey={2}> Product Index </NavItem>
        </LinkContainer>
        <LinkContainer eventKey={3} exact to="/shopping_trips">
          <NavItem eventKey={4}>Shopping Trip History</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={5} disabled>Logged in as: {username}</NavItem>
        <NavItem eventKey={6} onClick={handleLogOut}>Log Out</NavItem>
      </Nav>
    </Navbar>
  ) : (
    null
  );
});

export default Navigation;
