import mongoose from 'mongoose';
import crawl from './crawl';
import batchConfig from './config';
import mongoConfig from '../mongodb/config';
import HiringNotice from '../mongodb/model/HiringNotice';
import refineJobData from '../mongodb/refineData/refineJobData';
import setIntervalImmediate from '../util/setIntervalImmediate';
import mergeNewDataWithOldData from './mergeNewDataWithOldData';

const crawlAndSave = () => {
  console.log('Start crawling...');
  return crawl()
    .then(async (jobData) => {
      const dataForMongodb = refineJobData(jobData);
      const existingData = (await HiringNotice.find()).map(data => data._doc);
      mergeNewDataWithOldData(dataForMongodb, existingData);
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
