/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home';
import LoginForm from './LoginForm';
import Users from './UsersView';
import UserBlogList from './UserBlogList';
import BlogView from './BlogView';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const VisibilityFilter = (props) => (
  <div className="container">
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
            <div className="container">
              <Container>
                <Row className="row-m-b">
                  <Col md={12}>
                    <NavigationBar />
                  </Col>
                </Row>
                <Row className="row-m-b">
                  <Col md={12}><h2>blog app</h2></Col>
                </Row>
                <Row className="row-m-b">
                  <Col md={12}>
                    <Switch>
                      <Route path="/users/:id" component={UserBlogList} />
                      <Route path="/users" component={Users} />
                      <Route path="/blogs/:id" component={BlogView} />
                      <Route path="/" component={Home} />
                    </Switch>
                  </Col>
                </Row>
                <Row className="row-m-b">
                  <Col md={12}>
                    <Footer />
                  </Col>
                </Row>
              </Container>
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
