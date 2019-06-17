import React from 'react';
import SearchSection from './SearchSection';
import './Menu.scss';

export default (props) => {
  const { isMenuOpen } = props;
  const searchTargetList = [{
    textForView: '회사',
    api: {
      method: 'company',
      path: '',
      queries: [],
    },
  }, {
    textForView: '직군',
    api: {
      method: 'job-group',
      path: '',
      queries: [],
    },
  }, {
    textForView: '분류',
    api: {
      method: 'category',
      path: '',
      queries: [],
    },
  }];
  const render = () => searchTargetList.map(searchTarget => (
    <SearchSection key={`search-section-${searchTarget.api.method}`} searchTarget={searchTarget} />
  ));

  return (
    <div className={`menu ${isMenuOpen ? 'opened' : 'closed'}`}>
      <section className="title-section">
        <h2>filters</h2>
      </section>
      {render()}
    </div>
  );
};
