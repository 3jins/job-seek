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
    contextVarName: 'companies',
  }, {
    textForView: '직군',
    api: {
      method: 'job-group',
      path: '',
      queries: [],
    },
    contextVarName: 'jobGroups',
  }, {
    textForView: '분류',
    api: {
      method: 'category',
      path: '',
      queries: [],
    },
    contextVarName: 'categories',
  }];
  const render = () => searchTargetList.map(searchTarget => (
    <SearchSection key={`search-section-${searchTarget.api.method}`} searchTarget={searchTarget} />
  ));

  return (
    <div className={`menu ${isMenuOpen ? 'opened' : 'closed'}`}>
      <div className="wrapper">
        <section className="title-section">
          <h2>filters</h2>
        </section>
        {render()}
      </div>
    </div>
  );
};
