import React from 'react';
import './TopBar.scss';
import menuImage from '../../../../images/menu.png';

export default (props) => {
  const { isMenuOpen, setIsMenuOpen } = props;
  return (
    <div className="top-bar">
      <div className="title-div">
        <h1>JOB SEEK</h1>
      </div>
      <div className="menu-button-div">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={menuImage} alt="menu button" />
        </button>
      </div>
    </div>
  );
};
