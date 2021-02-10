import { ObjectId } from 'mongoose';

export default interface ActivityLog {
  startDate: Date;
  activityType_id: ObjectId;
  endDate?: Date;
}
