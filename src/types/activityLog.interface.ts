import ActivityType from './activityType.interface'
import { ObjectId } from 'bson'

export default interface ActivityLog {
  _id: ObjectId
  startDate: Date
  activityType_id: ObjectId | ActivityType
  endDate?: Date
}
