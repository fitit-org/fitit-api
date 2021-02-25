import { ObjectId } from 'bson'

const validator = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'isActive', 'humanReadable'],
      properties: {
        name: {
          bsonType: 'string',
        },
        isActive: {
          bsonType: 'bool',
        },
        humanReadable: {
          bsonType: 'string',
        },
      },
    },
  },
}

const data = [
  {
    _id: new ObjectId('601bd55f22c26a2ef9298df3'),
    isActive: true,
    name: 'Example class 1',
    humanReadable: 'certifiable-rufous-james',
  },
  {
    _id: new ObjectId('601bd95922c26a2ef9298df9'),
    isActive: true,
    name: 'Example class 2',
    humanReadable: 'busy-shamrock-holmes',
  },
]

export default {
  validator,
  data,
}
