import mongoose from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

const AutoIncrement = MongooseSequence(mongoose);

const hiringNoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false, text: true },
  companyName: { type: String, required: true },
  jobGroup: { type: String, required: false },
  category: { type: String, required: false },
  dateCreated: { type: Date, required: true },
  uploadDateFrom: { type: Date, required: false },
  uploadDateUntil: { type: Date, required: false },
});

hiringNoticeSchema.plugin(AutoIncrement, { inc_field: 'id' });

export default mongoose.model('HiringNotice', hiringNoticeSchema, 'hiringNotices');
