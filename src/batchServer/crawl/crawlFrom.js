import navigateTo from './navigateTo';
import getTitles from './getTitles';
import getContents from './getContents';

export default async (uri, companyCrawlingMap, page) => {
  let crawled = [];
  const {
    categoryUrl,
    pagination,
    selector,
  } = companyCrawlingMap;
  const { list, detail: { content: contentSelector } } = selector;
  const { title: titleSelector, detailLink } = list;

  let curPageNo = 0;
  let doesNextPageExist = true;
  while (doesNextPageExist) {
    doesNextPageExist = await navigateTo(curPageNo, uri, pagination, titleSelector, page);
    try {
      await page.waitForSelector(titleSelector, { timeout: 5000 });
      const rawHtml = await page.content();
      const titles = getTitles(rawHtml, titleSelector);
      const contents = await getContents(rawHtml, detailLink, contentSelector, uri, page);
      if (titles.length === contents.length) {
        crawled = [...crawled, ...titles.map((title, idx) => {
          const content = contents[idx];
          return { title, content };
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
  return crawled;
};
