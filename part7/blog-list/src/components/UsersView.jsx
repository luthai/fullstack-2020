import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UsersView = (props) => {
  const { users } = props;

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
          {(users !== null) && (
            users.map((user) => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

UsersView.propTypes = {
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

UsersView.defaultProps = {
  users: null,
};

const mapPropsToState = (state) => ({
  users: state.users,
});

const ConnectedBlog = connect(
  mapPropsToState, null,
)(UsersView);

export default ConnectedBlog;
