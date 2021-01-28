import mongoose from 'mongoose';

const ActivityTypeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId,
  },
  name: { type: String, required: true, unique: true },
  kcalBurned: { type: Number, required: false, unique: false },
});

ActivityTypeSchema.set('toJSON', { getters: true });

const ActivityType = mongoose.model('ActivityType', ActivityTypeSchema);

export default ActivityType;
