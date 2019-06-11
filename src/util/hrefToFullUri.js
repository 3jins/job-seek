export default (href, uri) => {
  if (!href.startsWith('/')) return href;
  const originUri = uri.slice(0, uri.indexOf('/', 'https://'.length));
  if (originUri.endsWith('/')) return originUri + href.slice(1);
  return originUri + href;
};
