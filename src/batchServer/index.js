import mongoose from 'mongoose';
import crawl from './crawl';
import batchConfig from './config';
import mongoConfig from '../mongodb/config';
import HiringNotice from '../mongodb/model/HiringNotice';
import refineJobData from '../mongodb/refineData/refineJobData';
import leaveRemovedDataOnly from '../mongodb/refineData/leaveRemovedDataOnly';
import leaveUpdatedDataOnly from '../mongodb/refineData/leaveUpdatedDataOnly';
import leaveNewDataOnly from '../mongodb/refineData/leaveNewDataOnly';
import setIntervalImmediate from '../util/setIntervalImmediate';

const crawlAndSave = () => {
  console.log('Start crawling...');
  return crawl()
    .then(async (jobData) => {
      const dataForMongodb = refineJobData(jobData);
      const existingData = (await HiringNotice.find()).map(data => data._doc);
      const idToRemove = leaveRemovedDataOnly(dataForMongodb, existingData)
        .map(dataToRemove => dataToRemove._id);
      const dataToUpdate = leaveUpdatedDataOnly(dataForMongodb, existingData);
      const dataToInsert = leaveNewDataOnly(dataForMongodb, existingData);
      HiringNotice.deleteMany({ _id: { $in: idToRemove } }, (err) => {
        if (err) console.error(err);
      });
      HiringNotice.insertMany(dataToInsert, (err) => {
        if (err) console.error(err);
      });
      dataToUpdate.forEach(updatedOne => HiringNotice.updateOne(
        { _id: updatedOne._id },
        updatedOne,
        (err) => {
          if (err) console.error(err);
        },
      ));
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
