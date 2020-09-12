import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin, credentials, setCredentials,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        id="username"
        type="text"
        value={credentials.username}
        name="Username"
        onChange={({ target }) => setCredentials((prev) => ({
          ...prev,
          username: target.value,
        }))}
      />
    </div>
    <div>
      password
      <input
        id="password"
        type="password"
        value={credentials.password}
        name="Password"
        onChange={({ target }) => setCredentials((prev) => ({
          ...prev,
          password: target.value,
        }))}
      />
    </div>
    <button id="login-button" type="submit">login</button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  credentials: PropTypes.objectOf(PropTypes.string).isRequired,
  setCredentials: PropTypes.func.isRequired,
};

export default LoginForm;
