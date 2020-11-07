import React, { useRef } from 'react';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import BlogsList from './BlogsList';

const Home = () => {
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogsList />
    </div>
  );
};

export default Home;
