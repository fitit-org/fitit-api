export default interface User {
  _id?: string;
  name: string;
  surname: string;
  class_ids: Array<string>;
  hashedPassword: string;
  dateCreated: Date;
  email: string;
  isActive: boolean;
  isTeacher: boolean;
  activityLog_ids?: Array<string>;
  birthDate?: Date;
  height?: number;
  weight?: number;
}
