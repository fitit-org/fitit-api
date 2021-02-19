import { MongoClient, MongoError, Db } from 'mongodb';

export class MongoHelper {
  public static client: MongoClient;
  public static db: Db;

  public static connect(): Promise<MongoClient> {
    return new Promise<MongoClient>((resolve, reject) => {
      MongoClient.connect(
        process.env.MONGO_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err: MongoError, client: MongoClient) => {
          if (err) {
            reject(err);
          } else {
            MongoHelper.client = client;
            MongoHelper.db = client.db(process.env.MONGO_DB);
            resolve(client);
          }
        }
      );
    });
  }

  public static async disconnect(): Promise<void> {
    return this.client.close();
  }

  public static async getDB(): Promise<Db> {
    if (MongoHelper.db === undefined) {
      await MongoHelper.connect();
    }
    return MongoHelper.db;
  }
}
