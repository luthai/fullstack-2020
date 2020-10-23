import React from 'react';
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
      props.setMessage(`${loginUser.username} is logged in.`, 5);
    } catch (exception) {
      props.setErrorMessage('Username or password is invalid!', 5);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          name="Username"
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          name="Password"
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
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
