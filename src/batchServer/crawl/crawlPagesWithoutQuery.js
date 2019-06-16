import getTitles from './getTitles';
import getContents from './getContents';

export default async (titleSelector, contentSelector, detailLink, uri, page) => {
  await page.waitForSelector(titleSelector, { timeout: 5000 });
  const rawHtml = await page.content();
  const titles = getTitles(rawHtml, titleSelector);
  const contents = await getContents(rawHtml, detailLink, contentSelector, uri, page);
  if (titles.length === contents.length) {
    return titles.map((title, idx) => {
      const content = contents[idx];
      return { title, content, categories: [] };
    });
  }
  console.error(`Number of parsed data doesn't match. title: ${titles.length}, content: ${contents.length}`);
  return [];
};
