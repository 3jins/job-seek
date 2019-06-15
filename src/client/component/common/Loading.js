import React from 'react';
import './Loading.scss';
import { PulseLoader } from 'react-spinners';

export default () => (
  <div className="loading">
    <PulseLoader
      sizeUnit="rem"
      size={1}
      color="#006a8f"
      loading
    />
    <p>loading</p>
  </div>
);
