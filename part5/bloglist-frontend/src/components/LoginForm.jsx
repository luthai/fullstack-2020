import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin, credentials, setCredentials,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
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
        type="password"
        value={credentials.password}
        name="Password"
        onChange={({ target }) => setCredentials((prev) => ({
          ...prev,
          password: target.value,
        }))}
      />
    </div>
    <button type="submit">login</button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  credentials: PropTypes.objectOf(PropTypes.string),
  setCredentials: PropTypes.func,
};

LoginForm.defaultProps = {
  handleLogin: () => {},
  credentials: '',
  setCredentials: () => {},
};

export default LoginForm;
