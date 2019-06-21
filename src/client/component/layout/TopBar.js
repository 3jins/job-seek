import React from 'react';
import './TopBar.scss';

export default (props) => {
  const { isMenuOpen, setIsMenuOpen } = props;
  return (
    <div className="top-bar">
      <div className="title-div">
        <h1><a href="/">JOB SEEK</a></h1>
      </div>
      <div className="menu-button-div">
        <div className={`menu-button ${isMenuOpen ? 'change' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
    </div>
  );
};
