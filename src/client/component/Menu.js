import React from 'react';
import './Menu.scss';

export default (props) => {
  const { isMenuOpen } = props;
  return (
    <div className={`menu ${isMenuOpen ? 'opened' : 'closed'}`}>
      <p>menu</p>
    </div>
  );
};
