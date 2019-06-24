import _ from 'lodash';
import getTitles from './getTitles';
import getContents from './getContents';

export default async (categoryKeywords, titleSelector, contentSelector, detailLink, uri, delimeter, location, page) => {
  await page.waitForSelector(titleSelector, { timeout: 5000 });
  const rawHtml = await page.content();
  const titles = getTitles(rawHtml, titleSelector);
  const contents = await getContents(rawHtml, detailLink, contentSelector, uri, page);
  if (titles.length === contents.length) {
    return titles.map((title, idx) => {
      const content = contents[idx];
      const categoryFromTitle = title.trim().slice(location).split(delimeter)[0];
      const categories = _.keys(
        _.pickBy(
          categoryKeywords,
          categoryKeywordList => categoryKeywordList.includes(categoryFromTitle),
        ),
      );
      return {
        title,
        content,
        categories,
        originUrl: uri,
      };
    });
  }
  console.error(`Number of parsed data doesn't match. title: ${titles.length}, content: ${contents.length}`);
  return [];
};
