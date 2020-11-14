import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { setUser } from '../Reducers/userReducer';
import { setMessage } from '../Reducers/notificationReducer';
import { setErrorMessage } from '../Reducers/errorNotificationReducer';

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const username = event.target.username.value;
      const password = event.target.password.value;
      event.target.username.value = '';
      event.target.password.value = '';
      const loginUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loginUser),
      );
      blogService.setToken(loginUser.token);
      props.setUser(loginUser);
      props.setMessage(`${loginUser.name} is logged in.`, 5);
    } catch (exception) {
      props.setErrorMessage('Username or password is invalid!', 5);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          name="Username"
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          id="password"
          type="password"
          name="Password"
        />
      </Form.Group>
      <Button id="login-button" type="submit">login</Button>
    </Form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setUser,
  setMessage,
  setErrorMessage,
};

const ConnectedBlogs = connect(
  null,
  mapDispatchToProps,
)(LoginForm);

export default ConnectedBlogs;
