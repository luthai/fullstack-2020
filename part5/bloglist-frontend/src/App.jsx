import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ErrorNotification from './components/ErrorNotification';
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
    } catch (exception) {
      setErrorMessage(exception.message);
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
    } catch (exception) {
      setErrorMessage('Fail adding new blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  return (
    <div>
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
