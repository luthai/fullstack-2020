import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const { buttonLabel } = props;
  const { children } = props;

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="Button" type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className="Button" type="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Togglable;
