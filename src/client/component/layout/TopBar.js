import React from 'react';
import './TopBar.scss';
import menuImage from '../../../../images/menu.png';

export default () => {
  return (
    <div className="top-bar">
      <div className="title-div">
        <h1>JOB SEEK</h1>
      </div>
      <div className="menu-button-div">
        <button>
          <img src={menuImage} />
        </button>
      </div>
    </div>
  );
};
