import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBlogReducer } from '../Reducers/blogReducer';

const BlogForm = (props) => {
  const addNewBlog = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';
    props.createBlogReducer({
      title, author, url,
    });
  };

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title:
        <input
          id="title"
          type="text"
          name="text"
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          name="author"
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          name="url"
        />
      </div>
      <button id="create-btn" className="Button" type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  createBlogReducer: PropTypes.func.isRequired,
};

export default connect(null, { createBlogReducer })(BlogForm);
