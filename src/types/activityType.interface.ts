import { ObjectId, Double } from 'bson';

export default interface ActivityType {
  name: ObjectId;
  kcalPerHour: Double;
}
