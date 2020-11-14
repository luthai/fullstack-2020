import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../Reducers/userReducer';
import { setMessage } from '../Reducers/notificationReducer';

const LogoutForm = (props) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    props.setMessage(`${props.user.username} is logged out!`, 5);
    props.setUser(null);
  };

  return (
    <div>
      <Button type="button" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

LogoutForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = {
  setUser, setMessage,
};

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutForm);

export default ConnectedBlogs;
