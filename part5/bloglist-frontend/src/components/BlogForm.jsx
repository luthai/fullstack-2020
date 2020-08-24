import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: '',
  });

  const addNewBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    setNewBlog((prev) => ({
      ...prev,
      title: '',
      author: '',
      url: '',
    }));
  };

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => setNewBlog((prev) => ({
            ...prev,
            title: target.value,
          }))}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="Title"
          onChange={({ target }) => setNewBlog((prev) => ({
            ...prev,
            author: target.value,
          }))}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="Title"
          onChange={({ target }) => setNewBlog((prev) => ({
            ...prev,
            url: target.value,
          }))}
        />
      </div>
      <button className="Button" type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
