import mongoose from 'mongoose';
import ActivityType from '../../../types/activityType.interface';

export const ActivityTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    kcalPerHour: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'activityTypes',
  }
);

const activityTypeModel = mongoose.model<ActivityType & mongoose.Document>(
  'ActivityType',
  ActivityTypeSchema
);

export default activityTypeModel;
