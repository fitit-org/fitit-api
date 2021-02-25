import ActivityLog from './activityLog.interface'
import Class from './class.interface'
import { ObjectId, Double } from 'bson'

export default interface User {
  _id?: ObjectId
  name: string
  surname: string
  class_ids: Array<ObjectId> | Array<Class>
  hashedPassword?: string
  dateCreated: Date
  email: string
  isActive: boolean
  isTeacher: boolean
  activityLog_ids?: Array<ObjectId> | Array<ActivityLog>
  birthDate?: Date
  height?: Double
  weight?: Double
}
