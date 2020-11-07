import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const BlogsView = (props) => {
  const { blogs } = props;

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

BlogsView.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  })).isRequired,
};

const mapPropsToState = (state) => ({
  blogs: state.blogs,
});

const ConnectedBlog = connect(
  mapPropsToState, null,
)(BlogsView);

export default ConnectedBlog;
