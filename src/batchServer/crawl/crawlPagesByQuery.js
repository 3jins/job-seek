import getTitles from './getTitles';

export default async (categoryKey, titleSelector, page) => {
  await page.waitForSelector(titleSelector, { timeout: 5000 });
  const rawHtml = await page.content();
  const titles = getTitles(rawHtml, titleSelector);
  return titles.map(title => ({ title, categories: [categoryKey] }));
};
