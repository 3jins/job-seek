import React from 'react';
import axios from 'axios';
import AutoCompleteInput from '../common/AutoCompleteInput';
import mergeQueryToUri from '../../../util/mergeQueryToUri';
import './SearchSection.scss';

export default (props) => {
  const { searchTarget } = props;
  const { textForView, api: { method, path, query }, contextVarName } = searchTarget;

  const searchAPI = (text) => {
    const queries = {};
    queries[query] = text;
    if (text === '') return new Promise(resolve => resolve([]));
    return axios(mergeQueryToUri(`/${method}${path}`, queries))
      .then(response => response.data
        .map(result => result.name)
        .filter(companyName => companyName.search(text) >= 0));
  };

  return (
    <section className="search-section">
      <h4>{textForView}</h4>
      <AutoCompleteInput searchAPI={searchAPI} contextVarName={contextVarName} />
    </section>
  );
};
