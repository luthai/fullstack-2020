import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ErrorNotification = () => {
  const notification = useSelector((state) => state.errorMessage);
  if (notification === null) {
    return null;
  }

  return (
    <div className="container">
      <Alert variant="danger">
        {notification}
      </Alert>
    </div>
  );
};

export default ErrorNotification;
