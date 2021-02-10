import { ObjectId } from 'mongoose';

export default interface User {
  name: string;
  surname: string;
  class_ids: Array<ObjectId>;
  hashedPassword: string;
  dateCreated: Date;
  email: string;
  isActive: boolean;
  isTeacher: boolean;
  activityLog_ids?: Array<ObjectId>;
  birthDate?: Date;
  height?: number;
  weight?: number;
}
