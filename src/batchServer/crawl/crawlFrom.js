/* eslint-disable no-await-in-loop, no-restricted-syntax */
import _ from 'lodash';
import navigateTo from './navigateTo';
import getTitles from './getTitles';
import getContents from './getContents';
import mergeDuplicates from './mergeDuplicates';
import mergeQueryToUri from '../../util/mergeQueryToUri';

export default async (uri, companyCrawlingMap, categoryKeywords, page) => {
  let crawled = [];

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
        let curPageNo = 0;
        let doesNextPageExist = true;
        while (doesNextPageExist) {
          doesNextPageExist = await navigateTo(
            curPageNo, uriWithCategoryQuery, pagination, titleSelector, page,
          );
          try {
            await page.waitForSelector(titleSelector, { timeout: 5000 });
            const rawHtml = await page.content();
            const titles = getTitles(rawHtml, titleSelector);
            const contents = await getContents(rawHtml, detailLink, contentSelector, uri, page);
            if (titles.length === contents.length) {
              crawled = [...crawled, ...titles.map((title, idx) => {
                const content = contents[idx];
                if (categoryKey === 'all') return { title, content, categories: [] };
                return { title, content, categories: [categoryKey] };
              })];
            } else {
              console.error(`Number of parsed data doesn't match. title: ${titles.length}, content: ${contents.length}`);
            }
            curPageNo += 1;
          } catch (err) {
            console.error(err);
            doesNextPageExist = false;
          }
        }
      }
      console.log(categoryKey);
      console.log(crawled.map(crawled => [crawled.title, crawled.categories]));
    }
  } else {
    const { delimeter, location } = category;
    let doesNextPageExist = true;
    while (doesNextPageExist) {
      doesNextPageExist = await navigateTo(
        curPageNo, uri, pagination, titleSelector, page,
      );
      try {
        await page.waitForSelector(titleSelector, { timeout: 5000 });
        const rawHtml = await page.content();
        const titles = getTitles(rawHtml, titleSelector);
        const contents = await getContents(rawHtml, detailLink, contentSelector, uri, page);
        if (titles.length === contents.length) {
          crawled = [...crawled, ...titles.map((title, idx) => {
            const content = contents[idx];
            const categoryFromTitle = title.trim().slice(location).split(delimeter)[0];
            const categories = _.keys(
              _.pickBy(categoryKeywords, categoryKeywordList => categoryKeywordList.includes(categoryFromTitle)),
            );
            return { title, content, categories };
          })];
        } else {
          console.error(`Number of parsed data doesn't match. title: ${titles.length}, content: ${contents.length}`);
        }
        curPageNo += 1;
      } catch (err) {
        console.error(err);
        doesNextPageExist = false;
      }
    }
  }

  crawled = mergeDuplicates(crawled);

  return crawled;
};
