import { ObjectId, Double } from 'bson'

const data = [
  {
    _id: new ObjectId('601be28e50364b654dec42cf'),
    isActive: true,
    isTeacher: false,
    email: 'testpupil.email@example.com',
    activityLog_ids: [
      new ObjectId('601bef6a25c8480b19dd54cd'),
      new ObjectId('601bef6a25c8480b19dd99cd'),
    ],
    birthDate: new Date('2001-01-04T23:00:00.000+00:00'),
    class_ids: [new ObjectId('601bd55f22c26a2ef9298df3')],
    dateCreated: new Date('2021-02-04T12:03:26.000+00:00'),
    hashedPassword:
      '$2b$10$jxQmFnwtkSf3gHwai8NPRut51KdvOwjp/H8bEvHMszd7pN3xqMJSy',
    height: new Double(182),
    weight: new Double(50),
    name: 'Example',
    surname: 'Pupil',
  },
  {
    _id: new ObjectId('601be28e50364b654de12345'),
    isActive: true,
    isTeacher: false,
    email: 'testpupil2.email@example.com',
    activityLog_ids: [] as Array<ObjectId>,
    class_ids: [] as Array<ObjectId>,
    dateCreated: new Date('2021-02-04T12:03:26.000+00:00'),
    hashedPassword:
      '$2b$10$jxQmFnwtkSf3gHwai8NPRut51KdvOwjp/H8bEvHMszd7pN3xqMJSy',
    name: 'Example',
    surname: 'Pupil2',
  },
  {
    _id: new ObjectId('601be28e51164b654de12345'),
    isActive: true,
    isTeacher: false,
    email: 'testpupil3.email@example.com',
    activityLog_ids: [] as Array<ObjectId>,
    class_ids: [new ObjectId('601bd55f22c26a2ef9298df3')],
    dateCreated: new Date('2021-02-04T12:03:26.000+00:00'),
    hashedPassword:
      '$2b$10$jxQmFnwtkSf3gHwai8NPRut51KdvOwjp/H8bEvHMszd7pN3xqMJSy',
    name: 'Example',
    surname: 'Pupil3',
  },
  {
    _id: new ObjectId('601be2c550364b654de09876'),
    isActive: true,
    isTeacher: true,
    email: 'testteacher2.email@example.com',
    class_ids: [] as Array<ObjectId>,
    dateCreated: new Date('2021-02-04T12:04:21.000+00:00'),
    hashedPassword:
      '$2b$10$jxQmFnwtkSf3gHwai8NPRut51KdvOwjp/H8bEvHMszd7pN3xqMJSy',
    name: 'Example',
    surname: 'Teacher2',
  },
  {
    _id: new ObjectId('601be2c550364b654dec42d0'),
    isActive: true,
    isTeacher: true,
    email: 'testteacher.email@example.com',
    birthDate: new Date('1970-10-08T23:00:00.000+00:00'),
    class_ids: [
      new ObjectId('601bd55f22c26a2ef9298df3'),
      new ObjectId('601bd95922c26a2ef9298df9'),
    ],
    dateCreated: new Date('2021-02-04T12:04:21.000+00:00'),
    hashedPassword:
      '$2b$10$jxQmFnwtkSf3gHwai8NPRut51KdvOwjp/H8bEvHMszd7pN3xqMJSy',
    name: 'Example',
    surname: 'Teacher',
  },
]

const validator = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'name',
        'surname',
        'class_ids',
        'hashedPassword',
        'dateCreated',
        'email',
        'isActive',
        'isTeacher',
      ],
      properties: {
        name: {
          bsonType: 'string',
        },
        surname: {
          bsonType: 'string',
        },
        class_ids: {
          bsonType: 'array',
          items: {
            bsonType: 'objectId',
          },
        },
        hashedPassword: {
          bsonType: 'string',
        },
        dateCreated: {
          bsonType: 'date',
        },
        email: {
          bsonType: 'string',
        },
        activityLog_ids: {
          bsonType: 'array',
          items: {
            bsonType: 'objectId',
          },
        },
        isActive: {
          bsonType: 'bool',
        },
        isTeacher: {
          bsonType: 'bool',
        },
        birthDate: {
          bsonType: 'date',
        },
        height: {
          bsonType: 'double',
        },
        weight: {
          bsonType: 'double',
        },
      },
    },
  },
}

export default {
  validator,
  data,
}
