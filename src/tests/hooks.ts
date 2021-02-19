import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoHelper } from '../utils/mongo.helper';
import ActivityTypeTestData from './testData/activityTypeTestData';
import ActivityLogTestData from './testData/activityLogTestData';
import ClassesTestData from './testData/classesTestData';
import UsersTestData from './testData/usersTestData';
import TeacherCodesTestData from './testData/teacherCodesTestData';

let con: MongoClient;
let db: Db;
let mongoServer: MongoMemoryServer;

async function recreateCollections() {
  return Promise.all([
    await db.createCollection('teacherCodes', TeacherCodesTestData.validator),
    await db.createCollection('users', UsersTestData.validator),
    await db.createCollection('classes', ClassesTestData.validator),
    await db.createCollection('activityTypes', ActivityTypeTestData.validator),
    await db.createCollection('activityLogs', ActivityLogTestData.validator),
  ]);
}

async function insertData() {
  return Promise.all([
    await db.collection('teacherCodes').insertMany(TeacherCodesTestData.data),
    await db.collection('activityTypes').insertMany(ActivityTypeTestData.data),
    await db.collection('activityLogs').insertMany(ActivityLogTestData.data),
    await db.collection('classes').insertMany(ClassesTestData.data),
    await db.collection('users').insertMany(UsersTestData.data),
  ]);
}

async function cleanup() {
  const collections = await db.listCollections().toArray();
  return Promise.all(
    collections
      .map(({ name }) => name)
      .map((collection) => db.collection(collection).drop())
  );
}

exports.mochaHooks = {
  beforeAll: async function (): Promise<void> {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    process.env.MONGO_URL = mongoUri;
    con = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = con.db(await mongoServer.getDbName());
    process.env.MONGO_DB = await mongoServer.getDbName();
    import('../server');
  },
  afterAll: async function (): Promise<void> {
    after(async () => {
      if (con) {
        con.close();
      }
      if (mongoServer) {
        await mongoServer.stop();
      }
    });
  },
  beforeEach: async function (): Promise<void> {
    await recreateCollections();
    await insertData();
    await MongoHelper.connect();
  },
  afterEach: async function (): Promise<void> {
    await MongoHelper.disconnect();
    await cleanup();
  },
};
