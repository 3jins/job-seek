import _ from 'lodash';
import puppeteer from 'puppeteer';
import config from '../config';
import * as map from './map';
import crawlFrom from './crawlFrom';
import category from './category';

export default () => {
  const jobData = {};
  const { exclude } = config;
  const filtered = _.pickBy(map, (val, companyName) => !exclude.includes(companyName));
  const browserController = {};

  const puppeteerTask = puppeteer.launch()
    .then((browser) => {
      browserController.browser = browser;
      return browser.newPage();
    })
    .then(async (page) => {
      const companyNames = Object.keys(filtered);
      for (const companyName of companyNames) {
        try {
          jobData[companyName] = {};
          const companyCrawlingMap = filtered[companyName];
          if (exclude.includes(companyName)) return;
          const { uris } = companyCrawlingMap;
          const jobGroups = Object.keys(uris);
          for (const jobGroup of jobGroups) {
            console.log(`Crawling notices for [${jobGroup}] job group in [${companyName}]...`);
            const uri = uris[jobGroup];
            const categoryList = jobGroup in category[companyName] ? category[companyName][jobGroup] : {};
            jobData[companyName][jobGroup] = await crawlFrom(uri, companyCrawlingMap, categoryList, page);
          }
        } catch (err) {
          console.error(err);
        }
      }
      browserController.browser.close();
    });

  return new Promise(
    resolve => puppeteerTask.then(() => resolve(jobData)),
  );
};
