/* eslint-disable no-await-in-loop */
import navigateTo from './navigateTo';

export default async (nextUri, pagination, titleSelector, page, callback, ...args) => {
  const crawled = [];
  let curPageNo = 0;
  let doesNextPageExist = true;
  while (doesNextPageExist) {
    doesNextPageExist = await navigateTo(
      curPageNo, nextUri, pagination, titleSelector, page,
    );
    crawled.push(...(await callback(...args)));
    curPageNo += 1;
  }
  return crawled;
};
