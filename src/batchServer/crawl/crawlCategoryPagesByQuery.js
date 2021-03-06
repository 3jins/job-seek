import getTitles from './getTitles';

export default async (categoryKey, titleSelector, page) => {
  try {
    await page.waitForSelector(titleSelector, { timeout: 5000 });
    const rawHtml = await page.content();
    const titles = getTitles(rawHtml, titleSelector);
    return titles.map(title => ({ title, categories: [categoryKey] }));
  } catch (err) {
    if (err.name === 'TimeoutError') {
      console.log(`It seems there is no hiring notice for one of the queries of ${categoryKey}.`);
    } else {
      console.error(err);
    }
  }
  return [];
};
