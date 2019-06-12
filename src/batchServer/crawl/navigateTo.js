import mergeQueryToUri from '../../util/mergeQueryToUri';
import getQueryValueFromUri from '../../util/getQueryValueFromUri';

export default async (curPageNo, uri, paginationObj, titleSelector, page) => {
  const { type } = paginationObj;
  if (type === 'urlQuery') {
    const { variableName } = paginationObj;
    const queries = {};
    queries[variableName] = curPageNo + 1;
    const nextPageUri = mergeQueryToUri(uri, queries);
    await page.goto(nextPageUri);
    const navigatedUri = await page.evaluate(() => location.href);
    const navigatedPageNo = getQueryValueFromUri(navigatedUri, variableName);
    if (navigatedPageNo !== undefined
      && Number(getQueryValueFromUri(navigatedUri, variableName)) !== curPageNo + 1) {
      return false;
    }
  } else if (type === 'moreButton') {
    const { selector } = paginationObj;
    await page.goto(uri);
    let curNumNotices = await page.$$eval(titleSelector, notices => notices.length);
    let prevNumNotices = curNumNotices;

    do {
      try {
        await page.click(selector);
      } catch (err) {
        if (err.message !== 'Node is either not visible or not an HTMLElement') console.error(err);
        else break;
      }
      await page.waitFor(500); // TODO: Find better solution
      prevNumNotices = curNumNotices;
      curNumNotices = await page.$$eval(titleSelector, notices => notices.length);
    } while (prevNumNotices !== curNumNotices);
    return false;
  } else if (type === 'none') {
    await page.goto(uri);
    return false;
  } else {
    console.error('Pagination object in one of the crawling map files might be wrong.');
    console.error(`uri: ${uri}`);
  }
  return true;
};
