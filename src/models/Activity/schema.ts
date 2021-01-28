import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ActivityType from '../ActivityType/schema';

const ActivitySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId,
  },
  startTime: { type: Date, required: true, unique: false },
  endTime: { type: Date, required: true, unique: false },
  activityType: { type: mongoose.Schema.Types.ObjectId, ref: 'ActivityType' },
});

ActivitySchema.set('toJSON', { getters: true });

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
