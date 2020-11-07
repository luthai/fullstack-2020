import React, { useRef } from 'react';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import BlogsView from './BlogsView';

const Home = () => {
  const blogFormRef = useRef();

  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogsView />
    </div>
  );
};

export default Home;
