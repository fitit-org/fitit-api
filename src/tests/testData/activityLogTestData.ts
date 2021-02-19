import { ObjectId } from 'bson';

const validator = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['startDate', 'activityType_id'],
      properties: {
        startDate: {
          bsonType: 'date',
        },
        endDate: {
          bsonType: 'date',
        },
        activityType_id: {
          bsonType: 'objectId',
        },
      },
    },
  },
};

const data = [
  {
    _id: new ObjectId('601bef6a25c8480b19dd54cd'),
    startDate: new Date('2021-02-04T12:58:18.000+00:00'),
    activityType_id: new ObjectId('601bd8d722c26a2ef9298df7'),
  },
  {
    _id: new ObjectId('601bef6a25c8480b19dd99cd'),
    startDate: new Date('2021-02-04T12:58:18.000+00:00'),
    endDate: new Date('2021-02-05T12:58:18.000+00:00'),
    activityType_id: new ObjectId('601bd8d722c26a2ef9298df7'),
  },
];

export default {
  validator,
  data,
};
