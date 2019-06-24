import getTitles from './getTitles';
import getContents from './getContents';

export default async (titleSelector, contentSelector, detailLink, uri, page) => {
  try {
    await page.waitForSelector(titleSelector, { timeout: 5000 });
    const rawHtml = await page.content();
    const titles = getTitles(rawHtml, titleSelector);
    const {
      contents,
      originUrls,
    } = await getContents(rawHtml, detailLink, contentSelector, uri, page);
    if (titles.length === contents.length) {
      return titles.map((title, idx) => {
        const content = contents[idx];
        const originUrl = originUrls[idx];
        return {
          title,
          content,
          categories: [],
          originUrl,
        };
      });
    }
    console.error(`Number of parsed data doesn't match. title: ${titles.length}, content: ${contents.length}`);
  } catch (err) {
    if (err.name === 'TimeoutError') {
      console.log('It seems there is no hiring notice.');
    } else {
      console.error(err);
    }
  }
  return [];
};
