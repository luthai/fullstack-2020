import React from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

Blog.propTypes = {
  blog: PropTypes.string,
};

Blog.defaultProps = {
  blog: '',
};

export default Blog;
