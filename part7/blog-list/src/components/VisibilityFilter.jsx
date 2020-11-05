/* eslint-disable react/destructuring-assignment */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import Blogs from './Blogs';
import Users from './UsersView';
import UserBlogList from './UserBlogList';

const VisibilityFilter = (props) => {
  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const Home = () => (
    <div>
      <div>
        <h2>create new</h2>
        {blogForm()}
      </div>
      <Blogs />
    </div>
  );

  return (
    <div>
      <Router>
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
                <div>
                  <Link className="nav-link" to="/">home</Link>
                  <Link className="nav-link" to="/users">users</Link>
                </div>
                <h2>Blogs</h2>
                <br />
                <p>{props.user.username} logged in</p>
                <LogoutForm />
                <br />
                <Switch>
                  <Route path="/users/:id" component={UserBlogList} />
                  <Route path="/users" component={Users} />
                  <Route path="/" component={Home} />
                </Switch>
              </div>
            )
        }
      </Router>
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
