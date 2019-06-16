/* eslint-disable no-await-in-loop */
import _ from 'lodash';
import withEachPage from './withEachPage';
import crawlPagesWithoutQuery from './crawlPagesWithoutQuery';
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
    crawled.push(...(await withEachPage(
      uri, pagination, titleSelector, page,
      crawlPagesWithoutQuery,
      titleSelector, contentSelector, detailLink, uri, page,
    )));
    for (const categoryKey in categoryKeywords) {
      const categoryKeywordList = categoryKeywords[categoryKey];
      for (const categoryKeyword of categoryKeywordList) {
        const queries = {};
        queries[variableName] = categoryKeyword;
        const uriWithCategoryQuery = mergeQueryToUri(uri, queries);
        (await withEachPage(
          uriWithCategoryQuery, pagination, titleSelector, page,
          crawlPagesByQuery,
          categoryKey, titleSelector, page,
        )).forEach((newOne) => {
          const { title, categories } = newOne;
          _.find(crawled, { title }).categories.push(...categories);
        });
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
