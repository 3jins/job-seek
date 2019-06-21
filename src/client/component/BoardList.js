import _ from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SearchContext from '../SearchContext';
import Board from './Board';
import Loading from './common/Loading';
import Empty from './common/Empty';
import './BoardList.scss';

export default () => {
  const { searchContext } = useContext(SearchContext);

  const render = (hiringNoticeList, isResultEmpty) => {
    if (isResultEmpty) return <Empty message="보여줄 결과가 없습니다 😢" />;
    if (_.isEmpty(hiringNoticeList)) return <Loading />;
    const hiringNoticeListByCompany = _.groupBy(hiringNoticeList, 'companyName');
    return _.map(hiringNoticeListByCompany, (notices, companyName) => (
      <Board key={`board-${companyName}`} companyName={companyName} notices={notices} />
    ));
  };

  const [hiringNoticeList, setHiringNoticeList] = useState([]);
  const [isResultEmpty, setIsResultEmpty] = useState(false);
  useEffect(() => {
    axios
      .get('/hiring-notice')
      .then((hiringNotice) => {
        const filteredHiringNoticeList = hiringNotice.data
          .filter((notice) => {
            const { companyName, jobGroup, categories } = notice;
            return (
              (searchContext.companies.length === 0
                || searchContext.companies.includes(companyName))
              && (searchContext.jobGroups.length === 0 || jobGroup === 'unclassified'
                || searchContext.jobGroups.includes(jobGroup))
              && (searchContext.categories.length === 0
                || _.intersection(searchContext.categories, categories).length > 0)
            );
          });
        if (_.isEmpty(filteredHiringNoticeList)) {
          setIsResultEmpty(true);
        } else {
          setIsResultEmpty(false);
        }
        setHiringNoticeList(filteredHiringNoticeList);
      });
  }, [searchContext]);

  return (
    <div className="board-list">
      {render(hiringNoticeList, isResultEmpty)}
    </div>
  );
};
