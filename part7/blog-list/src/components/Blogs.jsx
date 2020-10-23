/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TogglableBlogs from './TogglableBlogs';
import { updateBlogReducer, deleteBlogReducer } from '../Reducers/blogReducer';
import { setMessage } from '../Reducers/notificationReducer';

const Blogs = (props) => {
  const updateBlog = async (object) => {
    props.updateBlogReducer(object);
  };

  const deleteBlog = (object) => {
    props.deleteBlogReducer(object.id);
    props.setMessage(`Blog ${object.title} by ${object.author} is removed.`, 5);
  };

  return (
    <div id="blog-list">
      {props.blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <TogglableBlogs
            key={blog.id}
            buttonLabel="view"
            blog={blog}
            updateBlog={updateBlog}
            user={props.user}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
});

const mapDispatchToProps = {
  updateBlogReducer,
  deleteBlogReducer,
  setMessage,
};

const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blogs);

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  })).isRequired,
  user: PropTypes.objectOf(PropTypes.string),
  updateBlogReducer: PropTypes.func.isRequired,
  deleteBlogReducer: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

Blogs.defaultProps = {
  user: null,
};

export default ConnectedBlogs;
