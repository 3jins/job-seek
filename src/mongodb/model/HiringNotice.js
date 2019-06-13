import mongoose from 'mongoose';

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

export default mongoose.model('HiringNotice', hiringNoticeSchema, 'hiringNotices');
