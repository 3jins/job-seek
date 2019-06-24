/* eslint-disable no-await-in-loop */
import _ from 'lodash';
import withEachPage from './withEachPage';
import crawlCategoryPagesWithoutQuery from './crawlCategoryPagesWithoutQuery';
import crawlCategoryPagesByQuery from './crawlCategoryPagesByQuery';
import crawlCategoryPagesByButton from './crawlCategoryPagesByButton';
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
      crawlCategoryPagesWithoutQuery,
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
          crawlCategoryPagesByQuery,
          categoryKey, titleSelector, page,
        )).forEach((newOne) => {
          const { title, categories } = newOne;
          const existingOne = _.find(crawled, { title });
          if (_.isEmpty(existingOne)) {
            console.error([
              'Result of crawling among the whole categories does not contain one from a specific category. There are 3 possible causes for this error.',
              ' 1. Exploring pages take too much time. Enlarge the timeout.',
              ' 2. One of the files in \'batchServer/crawl/map\' is in wrong format.',
              ' 3. Page that you are trying to crawl is going wrong.',
            ].join('\n'));
          } else {
            existingOne.categories = _.union(existingOne.categories, categories);
          }
        });
      }
    }
  } else {
    const { delimeter, location } = category;
    crawled.push(...(await withEachPage(
      uri, pagination, titleSelector, page,
      crawlCategoryPagesByButton,
      categoryKeywords, titleSelector, contentSelector, detailLink, uri, delimeter, location, page,
    )));
  }

  if ('postprocess' in companyCrawlingMap) {
    const { postprocess } = companyCrawlingMap;
    return postprocess(crawled);
  }
  return crawled;
};
