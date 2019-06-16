/* eslint-disable no-await-in-loop */
import withEachPage from './withEachPage';
import crawlPagesByQuery from './crawlPagesByQuery';
import crawlPagesByMoreButton from './crawlPagesByMoreButton';
import mergeQueryToUri from '../../util/mergeQueryToUri';

export default async (uri, companyCrawlingMap, categoryKeywords, page) => {
  const crawled = [];
  const {
    category,
    pagination,
    selector,
  } = companyCrawlingMap;
  const { list, detail: { content: contentSelector } } = selector;
  const { title: titleSelector, detailLink } = list;
  const { type } = category;
  if (type === 'query') {
    const { variableName } = category;
    for (const categoryKey in categoryKeywords) {
      const categoryKeywordList = categoryKeywords[categoryKey];
      for (const categoryKeyword of categoryKeywordList) {
        const queries = {};
        queries[variableName] = categoryKeyword;
        const uriWithCategoryQuery = categoryKey === 'all' ? uri : mergeQueryToUri(uri, queries);
        crawled.push(...(await withEachPage(
          uriWithCategoryQuery, pagination, titleSelector, page,
          crawlPagesByQuery,
          categoryKey, titleSelector, contentSelector, detailLink, uri, page,
        )));
      }
    }
  } else {
    const { delimeter, location } = category;
    crawled.push(...(await withEachPage(
      uri, pagination, titleSelector, page,
      crawlPagesByMoreButton,
      categoryKeywords, titleSelector, contentSelector, detailLink, uri, delimeter, location, page,
    )));
  }
  return crawled;
};
