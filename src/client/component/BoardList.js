import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';

export default () => {
  const render = (hiringNoticeList) => {
    const hiringNoticeListByCompany = _.groupBy(hiringNoticeList, 'companyName');
    return _.map(hiringNoticeListByCompany, (notices, companyName) => (
      <Board key={`board-${companyName}`} companyName={companyName} notices={notices} />
    ));
  };

  const [hiringNoticeList, setHiringNoticeList] = useState([]);
  useEffect(() => {
    axios
      .get('/hiring-notice')
      .then(hiringNotice => setHiringNoticeList(hiringNotice.data));
  }, []);

  return (
    <div className="board">
      {render(hiringNoticeList)}
    </div>
  );
};
