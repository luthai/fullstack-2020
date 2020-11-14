import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.message);
  if (notification === null) {
    return null;
  }

  return (
    <div className="container">
      <Alert variant="success">
        {notification}
      </Alert>
    </div>
  );
};

export default Notification;
