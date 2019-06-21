import React from 'react';
import './TopBar.scss';

export default (props) => {
  const { isMenuOpen, setIsMenuOpen } = props;
  const curPath = window.location.href;
  const needMenu = curPath.slice('https://'.length).split('/')[1] === ''; // home only

  return (
    <div className="top-bar">
      <div className="title-div">
        <h1><a href="/">JOB SEEK</a></h1>
      </div>
      {needMenu ? (
        <div className="menu-button-div">
          <div className={`menu-button ${isMenuOpen ? 'change' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
