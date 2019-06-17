import mongoose from 'mongoose';
import crawl from './crawl';
import batchConfig from './config';
import mongoConfig from '../mongodb/config';
import HiringNotice from '../mongodb/model/HiringNotice';
import Company from '../mongodb/model/Company';
import JobGroup from '../mongodb/model/JobGroup';
import Category from '../mongodb/model/Category';
import refineJobData from '../mongodb/refineData/refineJobData';
import setIntervalImmediate from '../util/setIntervalImmediate';
import mergeNewDataWithOldData from './mergeNewDataWithOldData';
import updateCompanyList from './updateCompanyList';
import updateJobGroupList from './updateJobGroupList';
import updateCategoryList from './updateCategoryList';


const crawlAndSave = () => {
  console.log('Start crawling...');
  return crawl()
    .then(async (jobData) => {
      const dataForMongodb = refineJobData(jobData);
      const existingData = (await HiringNotice.find()).map(data => data._doc);
      mergeNewDataWithOldData(dataForMongodb, existingData);
      const existingCompanies = (await Company.find()).map(company => company.name);
      updateCompanyList(dataForMongodb, existingCompanies);
      const existingJobGroups = (await JobGroup.find()).map(jobGroup => jobGroup.name);
      updateJobGroupList(dataForMongodb, existingJobGroups);
      const existingCategories = (await Category.find()).map(category => category.name);
      updateCategoryList(existingCategories);
      console.log('Done!');
    })
    .catch(err => console.error(err));
};

const { batchPeriod } = batchConfig;
const { host, port, database } = mongoConfig;

mongoose.connect(`mongodb://${host}:${port}/${database}`, { useCreateIndex: true, useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  setIntervalImmediate(crawlAndSave, batchPeriod);
});
