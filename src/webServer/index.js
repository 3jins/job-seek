import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import mongoConfig from '../mongodb/config';
import webConfig from './config';

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

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(pathInfo.public, 'index.html'));
});

const { host, port: dbPort, database } = mongoConfig;
mongoose.connect(`mongodb://${host}:${dbPort}/${database}`, { useCreateIndex: true, useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  app.listen(port, () => console.log('Express listening on port', port));
});
