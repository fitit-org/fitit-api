import { ObjectId, Double } from 'bson';

const validator = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'kcalPerHour'],
      properties: {
        name: {
          bsonType: 'string',
        },
        kcalPerHour: {
          bsonType: 'double',
        },
      },
    },
  },
};

const data = [
  {
    _id: new ObjectId('601bd8d722c26a2ef9298df7'),
    kcalPerHour: new Double(600),
    name: 'Kolarstwo',
  },
];

export default {
  validator,
  data,
};
