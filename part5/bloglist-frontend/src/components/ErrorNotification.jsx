import React from 'react';
import PropTypes from 'prop-types';

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null;
  }

  return (
    <div className="errorMessage">
      {errorMessage}
    </div>
  );
};

ErrorNotification.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorNotification.defaultProps = {
  errorMessage: '',
};

export default ErrorNotification;
