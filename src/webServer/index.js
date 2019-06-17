import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import mongoConfig from '../mongodb/config';
import webConfig from './config';
import hiringNotice from './api/hiringNotice';
import hiringNoticeDetail from './api/hiringNoticeDetail';
import company from './api/company';
import jobGroup from './api/jobGroup';
import category from './api/category';

const app = express();
const port = process.env.NODE_ENV === 'dev' ? 3000 : 80;
const { pathInfo } = webConfig;

if (process.env.NODE_ENV === 'dev') {
  app.use(logger('dev'));
} else {
  app.use(logger('dev', { skip: (req, res) => res.statusCode < 400 })); // console logging
  app.use(logger('common', { // file logging
    stream: fs.createWriteStream(path.resolve(pathInfo.root, 'access.log'), { flags: 'a' }),
  }));
}

app.use(express.static(pathInfo.public));

app.use('/hiring-notice', hiringNotice);
app.use('/hiring-notice-detail', hiringNoticeDetail)
app.use('/company', company);
app.use('/job-group', jobGroup);
app.use('/category', category);
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(pathInfo.public, 'index.html'));
});

const { host, port: dbPort, database } = mongoConfig;
mongoose.connect(`mongodb://${host}:${dbPort}/${database}`, { useCreateIndex: true, useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  app.listen(port, () => console.log('Express listening on port', port));
});
