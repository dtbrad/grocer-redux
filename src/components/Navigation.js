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
        <LinkContainer key={1} to="/products">
          <NavItem eventKey={1}> Product Index </NavItem>
        </LinkContainer>
        <LinkContainer key={2} to="/shopping_trips">
          <NavItem eventKey={2}>Shopping Trip History</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem key={3} disabled>Logged in as: {username}</NavItem>
        <NavItem key={4} onClick={handleLogOut}>Log Out</NavItem>
      </Nav>
    </Navbar>
  ) : (
    null
  );
});

export default Navigation;
