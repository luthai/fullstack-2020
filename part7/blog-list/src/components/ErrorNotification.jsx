import React from 'react';
import { useSelector } from 'react-redux';

const ErrorNotification = () => {
  const notification = useSelector((state) => state.errorMessage);
  if (notification === null) {
    return null;
  }

  return (
    <div className="errorMessage">
      {notification}
    </div>
  );
};

export default ErrorNotification;
