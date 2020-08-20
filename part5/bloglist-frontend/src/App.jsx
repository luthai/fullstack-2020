import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import ErrorNotification from './components/ErrorNotification';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([
    {
      title: 'React blog',
      author: 'Damien',
    },
    {
      title: 'Node blog',
      author: 'Lewis',
    },
  ]);

  useEffect(() => {
    blogService.getAll().then((blog) => setBlogs(blog));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const logInUser = await loginService.login({
        username, password,
      });

      setUser(logInUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
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
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            </div>
          )
          : (
            <div>
              <h2>Blogs</h2>
              <br />
              <p>{user.username} logged in</p>
              <br />
              {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
            </div>
          )
      }
    </div>
  );
};

export default App;
