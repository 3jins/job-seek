import cheerio from 'cheerio';

export default (rawHtml, titleSelector) => {
  // Timeout is necessary for the case the recruit board is empty
  const $ = cheerio.load(rawHtml);
  return $(titleSelector)
    .toArray()
    .map(untranslated => $(untranslated).text());
};
