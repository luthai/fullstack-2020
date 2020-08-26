import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TogglableBlogs = (props) => {
  const [view, setView] = useState(false);

  const { buttonLabel } = props;
  const { blog } = props;

  const toggleView = () => {
    setView(!view);
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
              likes {blog.likes} <button className="Button" type="button" onClick={() => {}}>like</button>
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
};

export default TogglableBlogs;
