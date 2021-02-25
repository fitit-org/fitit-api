import { MongoClient, MongoError, Db } from 'mongodb'

export class MongoHelper {
  public static client: MongoClient
  public static db: Db

  public static connect(): Promise<Db> {
    return new Promise<Db>((resolve, reject) => {
      MongoClient.connect(
        process.env.MONGO_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err: MongoError, client: MongoClient) => {
          if (err) {
            reject(err)
          } else {
            MongoHelper.client = client
            MongoHelper.db = client.db(process.env.MONGO_DB)
            resolve(MongoHelper.db)
          }
        }
      )
    })
  }

  public static async disconnect(): Promise<void> {
    return this.client.close()
  }

  public static async getDB(): Promise<Db> {
    if (MongoHelper.db === undefined) {
      console.log('DB was undefined!')
      await MongoHelper.connect()
    }
    return MongoHelper.db
  }
}
