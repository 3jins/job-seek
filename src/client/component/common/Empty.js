import React from 'react';
import './Empty.scss';

export default (props) => {
  const { message } = props;
  return (
    <div className="empty">
      <p>{message}</p>
    </div>
  );
};
