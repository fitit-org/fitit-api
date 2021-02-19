import { ObjectId } from 'bson';

const validator = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['humanReadable'],
      properties: {
        humanReadable: {
          bsonType: 'string',
        },
      },
    },
  },
};

const data = [
  {
    _id: new ObjectId('602e58b74b785e3d80815563'),
    humanReadable: 'AffGLJKqRRlggnB8skbzd',
  },
];

export default {
  validator,
  data,
};
