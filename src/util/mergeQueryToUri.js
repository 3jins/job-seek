import _ from 'lodash';

export default (uri, queries) => {
  const doesQueryExistInUri = uri.search('\\?') >= 0;
  return [
    uri, _.reduce(
      queries,
      (queryString, queryValue, queryKey) => `${queryString}${queryString.length === 0 ? '' : '&'}${queryKey}=${queryValue}`,
      '',
    ),
  ].join(doesQueryExistInUri ? '&' : '?');
};
