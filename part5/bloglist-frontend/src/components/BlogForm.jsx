import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({
  blog, setNewBlog, handleNewBlog,
}) => (
  <form onSubmit={handleNewBlog}>
    <div>
      title:
      <input
        type="text"
        value={blog.title}
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
        value={blog.author}
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
        value={blog.url}
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

BlogForm.propTypes = {
  blog: PropTypes.objectOf(PropTypes.string),
  setNewBlog: PropTypes.func,
  handleNewBlog: PropTypes.func,
};

BlogForm.defaultProps = {
  blog: '',
  setNewBlog: () => {},
  handleNewBlog: () => {},
};

export default BlogForm;
