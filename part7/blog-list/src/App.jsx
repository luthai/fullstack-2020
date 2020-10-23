import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import { initializeBlogs } from './Reducers/blogReducer';
import { setUser } from './Reducers/userReducer';
import VisibilityFilter from './components/VisibilityFilter';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
    }
  }, []);

  return (
    <div>
      <Notification />
      <ErrorNotification />
      <VisibilityFilter />
    </div>
  );
};

export default App;
