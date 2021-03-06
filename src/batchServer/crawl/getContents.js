import cheerio from 'cheerio';
import hrefToFullUri from '../../util/hrefToFullUri';

export default async (rawHtml, detailLink, contentSelector, uri, page) => {
  const { type, selector } = detailLink;
  const contents = [];
  const originUrls = [];

  let $ = cheerio.load(rawHtml);
  const anchorList = $(selector).toArray();
  for (const idx in anchorList) {
    const anchor = anchorList[idx];
    if (type === 'anotherPage') {
      const href = $(anchor).attr('href');
      await page.goto(hrefToFullUri(href, uri));
    } else if (type === 'singlepage') {
      await page.click(anchor);
    }
    await page.waitForSelector(contentSelector, { timeout: 5000 });
    const detailRawHtml = await page.content();
    $ = cheerio.load(detailRawHtml);
    $('img').each((i, img) => $(img).attr('src', hrefToFullUri($(img).attr('src'), uri)));
    contents.push($(contentSelector).html());
    originUrls.push(page.url());
  }

  return { contents, originUrls };
};
