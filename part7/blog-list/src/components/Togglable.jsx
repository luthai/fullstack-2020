import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const { buttonLabel } = props;
  const { children } = props;

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div className="row-m-b">
      <div style={hideWhenVisible}>
        <Button type="button" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button type="button" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
