import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogForm = ({
  user, blogs, handleLogout,
}) => (
  <div>
    <div>
      <p>{user.username} logged in
        <button className="logoutButton" type="button" onClick={handleLogout}>Logout</button>
      </p>
    </div>
    <br />
    {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
  </div>
);

BlogForm.propTypes = {
  user: PropTypes.string,
  blogs: PropTypes.arrayOf(PropTypes.array),
  handleLogout: PropTypes.func,
};

BlogForm.defaultProps = {
  user: '',
  blogs: [],
  handleLogout: () => {},
};

export default BlogForm;
