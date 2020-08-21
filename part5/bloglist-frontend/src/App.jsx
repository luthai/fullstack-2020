import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ErrorNotification from './components/ErrorNotification';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [credentials, setCredentials] = useState({
    username: '', password: '',
  });
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

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
      setUser(loginUser);
      setCredentials((prev) => ({
        ...prev,
        username: '',
        password: '',
      }));
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  /*
  <div>
                <h2>create new</h2>
                <form onSubmit={addNewBlog}>
                  <div>
                    title:
                    <input
                      type="text"
                      value={title}
                      name="Title"
                      onChange={({ target }) => setTitle(target.value)}
                    />
                  </div>
                  <div>
                    title:
                    <input
                      type="text"
                      value={author}
                      name="Title"
                      onChange={({ target }) => setAuthor(target.value)}
                    />
                  </div>
                  <div>
                    title:
                    <input
                      type="text"
                      value={url}
                      name="Title"
                      onChange={({ target }) => setUrl(target.value)}
                    />
                  </div>
                  <button className="Button" type="submit">create</button>
                </form>
              </div>
  */

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
              {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            </div>
          )
      }
    </div>
  );
};

export default App;
