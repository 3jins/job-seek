import mongoose from 'mongoose';

const jobGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model('JobGroup', jobGroupSchema, 'jobGroups');
