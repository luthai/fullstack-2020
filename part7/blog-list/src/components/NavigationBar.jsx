import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoutForm from './LogoutForm';

const NavigationBar = (props) => {
  const { user } = props;

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link className="nav-link" to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link className="nav-link" to="/users">users</Link>
            </Nav.Link>
            <Form inline>{user.username} logged in <LogoutForm /></Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
};

NavigationBar.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({ user: state.user });

const ConnectedBlogs = connect(mapStateToProps)(NavigationBar);

export default ConnectedBlogs;
