import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TogglableBlogs = ({
  buttonLabel, blog, updateBlog, user, deleteBlog,
}) => {
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleView = () => {
    setView(!view);
  };

  const toggleLikes = (event) => {
    event.preventDefault();

    setLikes(likes + 1);

    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: likes + 1,
      url: blog.url,
      id: blog.id,
    };

    updateBlog(newBlog);
  };

  const deleteBlogButton = (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-alert
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (confirm) {
      deleteBlog(blog);
    }
  };

  return (
    <div id={blog.title} className="blog">
      {
        view === false
          ? (
            <div className="showLess">
              {blog.title} {blog.author}
              <button id="viewBtn" className="Button" type="button" onClick={toggleView}>{buttonLabel}</button>
            </div>
          )
          : (
            <div className="showMore">
              {blog.title}
              <button id="hideBtn" className="Button" type="button" onClick={toggleView}>hide</button>
              <br />
              {blog.url}
              <br />
              likes <span id="likes" className="likes">{likes}</span>
              <button id="likeBtn" className="Button" type="button" onClick={toggleLikes}>like</button>
              <br />
              {blog.author}
              <br />
              <div>
                {blog.user.username === user.username
                && <button id="deleteBtn" className="Button" type="button" onClick={deleteBlogButton}>remove</button>}
              </div>
            </div>
          )
      }
    </div>
  );
};

TogglableBlogs.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    likes: PropTypes.number,
    url: PropTypes.string,
    id: PropTypes.string,
    user: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default TogglableBlogs;
