import { ObjectId } from 'bson';

export default interface Class {
  _id: ObjectId;
  humanReadable: string;
  isActive: boolean;
  name: string;
}
