import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = withRouter(({ authenticated, logOut, history }) => {
  const handleLogOut = async () => {
    await logOut();
    history.push('/welcome');
  };

  return authenticated ? (
    <Navbar fluid>
      <Nav>
        <LinkContainer key={2} to="/products">
          <NavItem eventKey={2}> Product Index </NavItem>
        </LinkContainer>
        <LinkContainer key={3} to="/shopping_trips">
          <NavItem eventKey={3}>Shopping Trip History</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem key={4} onClick={handleLogOut}>Log Out</NavItem>
      </Nav>
    </Navbar>
  ) : (
    null
  );
});

export default Navigation;
