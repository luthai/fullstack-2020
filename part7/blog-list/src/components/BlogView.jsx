import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateBlogReducer, addCommentBlogReducer } from '../Reducers/blogReducer';
import { setErrorMessage } from '../Reducers/errorNotificationReducer';

const BlogsList = (props) => {
  const { blogs } = props;
  const { id } = useParams();
  let blogParams = [];

  if (blogs !== null) {
    blogParams = blogs.find((blog) => blog.id === id);
  }

  const updateBlog = (event) => {
    try {
      event.preventDefault();

      const newBlog = {
        title: blogParams.title,
        author: blogParams.author,
        likes: blogParams.likes + 1,
        url: blogParams.url,
        id: blogParams.id,
      };
      props.updateBlogReducer(newBlog);
    } catch (exception) {
      props.setErrorMessage(`Failed updating blog ${blogParams.title}`, 5);
    }
  };

  const addComment = (event) => {
    try {
      event.preventDefault();

      const comment = event.target.comment.value;
      props.addCommentBlogReducer(id, comment);
    } catch (exception) {
      props.setErrorMessage(`Failed adding comment to blog ${blogParams.title}`, 5);
    }
  };

  return (
    <div>
      {blogParams !== undefined && (
        <div>
          <h1>{blogParams.title} by {blogParams.author}</h1>
          <div className="group-element">
            <a href={`https://${blogParams.url}`}>{blogParams.url}</a>
            <div>
              {blogParams.likes} likes
              <button id="likeBtn" className="Button" type="button" onClick={updateBlog}>like</button>
            </div>
            added by {blogParams.author}
          </div>
          <h3>comments</h3>
          <form onSubmit={addComment}>
            <input id="comment" type="text" name="comment" placeholder="new comment" />
            <button className="Button" type="submit">add comment</button>
          </form>
          <ul>
            {blogParams.comments.map((comment) => <li key={comment}>{comment}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  })).isRequired,
  updateBlogReducer: PropTypes.func.isRequired,
  addCommentBlogReducer: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const mapPropsToState = (state) => ({
  blogs: state.blogs,
});

const mapDispatchToProps = {
  updateBlogReducer,
  addCommentBlogReducer,
  setErrorMessage,
};

const ConnectedBlog = connect(
  mapPropsToState, mapDispatchToProps,
)(BlogsList);

export default ConnectedBlog;
