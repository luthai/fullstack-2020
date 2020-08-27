import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TogglableBlogs = ({ buttonLabel, blog, updateBlog }) => {
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

  return (
    <div className="blog">
      {
        view === false
          ? (
            <div>
              {blog.title} {blog.author}
              <button className="Button" type="button" onClick={toggleView}>{buttonLabel}</button>
            </div>
          )
          : (
            <div>
              {blog.title}
              <button className="Button" type="button" onClick={toggleView}>hide</button>
              <br />
              {blog.url}
              <br />
              likes {likes}
              <button className="Button" type="button" onClick={toggleLikes}>like</button>
              <br />
              {blog.author}
              <br />
            </div>
          )
      }
    </div>
  );
};

TogglableBlogs.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  blog: PropTypes.string.isRequired,
  updateBlog: PropTypes.func.isRequired,
};

export default TogglableBlogs;
