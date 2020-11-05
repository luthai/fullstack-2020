import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserBlogList = (props) => {
  const { users } = props;
  const { id } = useParams();
  let userParams = [];

  if (users !== null) {
    userParams = users.find((user) => user.id === id);
  }

  return (
    <div>
      <h2>{userParams.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {(users !== null) && (
          userParams.blogs.map((blog) => (
            <li key={blog.id}>
              {blog.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

UserBlogList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    blogs: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
    })),
    username: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  })),
};

UserBlogList.defaultProps = {
  users: null,
};

const mapPropsToState = (state) => ({
  users: state.users,
});

const ConnectedBlog = connect(
  mapPropsToState, null,
)(UserBlogList);

export default ConnectedBlog;
