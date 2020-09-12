import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import ErrorNotification from './components/ErrorNotification';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import TogglableBlogs from './components/TogglableBlogs';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const initialCredentials = {
    username: '',
    password: '',
  };
  const [credentials, setCredentials] = useState(initialCredentials);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blog) => setBlogs(blog));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await loginService.login({
        username: credentials.username,
        password: credentials.password,
      });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loginUser),
      );
      blogService.setToken(loginUser.token);
      setUser(loginUser);
      setCredentials(initialCredentials);

      setMessage(`${loginUser.username} is logged in!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Username or password is invalid!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addNewBlog = (blogObject) => {
    try {
      blogService
        .create(blogObject)
        .then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog));
        });

      blogFormRef.current.toggleVisibility();

      setMessage(`a new ${blogObject.title} by ${blogObject.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Failed creating new blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateBlog = (blogObject) => {
    try {
      blogService
        .update(blogObject.id, blogObject)
        .then((returnedBlog) => {
          setBlogs((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog));
        });
    } catch (exception) {
      setErrorMessage('Failed updating blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = (blogObject) => {
    try {
      blogService
        .deleteBlogRouter(blogObject.id)
        .then((returnedBlog) => {
          setBlogs(returnedBlog);
        });

      setMessage(`${blogObject.title} by ${blogObject.author} removed`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Failed deleting blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');

    setMessage(`${user.username} is logged out!`);
    setUser(null);
    setCredentials(initialCredentials);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addNewBlog} />
    </Togglable>
  );

  const togglableBlogs = () => (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <TogglableBlogs
            key={blog.id}
            buttonLabel="view"
            blog={blog}
            updateBlog={updateBlog}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );

  return (
    <div>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      {
        user === null
          ? (
            <div>
              <h2>Log in to application</h2>
              <LoginForm
                handleLogin={handleLogin}
                credentials={credentials}
                setCredentials={setCredentials}
              />
            </div>
          )
          : (
            <div>
              <h2>Blogs</h2>
              <br />
              <div>
                <p>{user.username} logged in
                  <button className="logoutButton" type="button" onClick={handleLogout}>Logout</button>
                </p>
              </div>
              <br />
              <div>
                <h2>create new</h2>
                {blogForm()}
              </div>
              {togglableBlogs()}
            </div>
          )
      }
    </div>
  );
};

export default App;
