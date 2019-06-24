/* eslint-disable no-await-in-loop */
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
    let isMoreButtonVisible = false;
    let moreButton = await page.waitForSelector(selector, {
      visible: true,
      hidden: true,
      timeout: 1000,
    });
    if (moreButton !== null) {
      await moreButton.focus(); // Move viewport to the moreButton
      isMoreButtonVisible = await moreButton.isIntersectingViewport();
    }
    while (isMoreButtonVisible) {
      await page.click(selector);
      while (prevNumNotices === curNumNotices) {
        await page.waitFor(1000);
        curNumNotices = await page.$$eval(titleSelector, notices => notices.length);
      }
      prevNumNotices = curNumNotices;
      curNumNotices = await page.$$eval(titleSelector, notices => notices.length);

      moreButton = await page.waitForSelector(selector, {
        visible: true,
        hidden: true,
        timeout: 1000,
      });
      if (moreButton !== null) {
        await moreButton.focus(); // Move viewport to the moreButton
        isMoreButtonVisible = await moreButton.isIntersectingViewport();
      }
    }
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
