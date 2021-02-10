import mongoose from 'mongoose';
import ActivityLog from '../../../types/activityLog.interface';

export const ActivityLogSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    activityType_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActivityType',
      required: true,
    },
    endDate: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'activityLogs',
  }
);

const activityLogModel = mongoose.model<ActivityLog & mongoose.Document>(
  'ActivityLog',
  ActivityLogSchema
);

export default activityLogModel;
