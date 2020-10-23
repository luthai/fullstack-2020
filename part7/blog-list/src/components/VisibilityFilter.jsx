/* eslint-disable react/destructuring-assignment */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import Blogs from './Blogs';

const VisibilityFilter = (props) => {
  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      {
        props.user === null
          ? (
            <div>
              <h2>Log in to application</h2>
              <LoginForm />
            </div>
          )
          : (
            <div>
              <h2>Blogs</h2>
              <br />
              <p>{props.user.username} logged in</p>
              <LogoutForm />
              <br />
              <div>
                <h2>create new</h2>
                {blogForm()}
              </div>
              <Blogs />
            </div>
          )
      }
    </div>
  );
};

VisibilityFilter.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
};

VisibilityFilter.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({ user: state.user });

const ConnectedBlogs = connect(mapStateToProps)(VisibilityFilter);

export default ConnectedBlogs;
