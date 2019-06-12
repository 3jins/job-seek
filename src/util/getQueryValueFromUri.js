export default (uri, variableName) => {
  const uriParts = uri.split('?');
  if (uriParts.length < 2) return undefined;
  const queryPart = uriParts[1];
  const matched = queryPart.split('&')
    .map((queryString) => {
      const queryObj = queryString.split('=');
      if (queryObj[0] === variableName) return queryObj[1];
      return false;
    })
    .filter(values => values);
  if (matched.length === 0) return undefined;
  return matched[0];
};
