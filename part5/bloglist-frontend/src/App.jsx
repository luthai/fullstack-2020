import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ErrorNotification from './components/ErrorNotification';
import Notification from './components/Notification';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [credentials, setCredentials] = useState({
    username: '', password: '',
  });
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: '',
  });
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blog) => setBlogs(blog));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
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
      setCredentials((prev) => ({
        ...prev,
        username: '',
        password: '',
      }));

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

  const handleNewBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });

      setBlogs(blogs.concat(blog));
      setNewBlog((prev) => ({
        ...prev,
        title: '',
        author: '',
        url: '',
      }));

      setMessage(`a new ${blog.title} by ${blog.author} added`);
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');

    setMessage(`${user.username} is logged out!`);
    setUser(null);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

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
                <BlogForm handleNewBlog={handleNewBlog} blog={newBlog} setNewBlog={setNewBlog} />
              </div>
              {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            </div>
          )
      }
    </div>
  );
};

export default App;
