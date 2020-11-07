/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import Users from './UsersView';
import UserBlogList from './UserBlogList';
import BlogView from './BlogView';

const VisibilityFilter = (props) => (
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
              <div className="navbar-container">
                <Link className="nav-link" to="/">blogs</Link>
                <Link className="nav-link" to="/users">users</Link>
                <div className="logout-container">{props.user.username} logged in <LogoutForm /></div>
              </div>
              <h2>blog app</h2>
              <Switch>
                <Route path="/users/:id" component={UserBlogList} />
                <Route path="/users" component={Users} />
                <Route path="/blogs/:id" component={BlogView} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          )
      }
    </Router>
  </div>
);

VisibilityFilter.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
};

VisibilityFilter.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({ user: state.user });

const ConnectedBlogs = connect(mapStateToProps)(VisibilityFilter);

export default ConnectedBlogs;
