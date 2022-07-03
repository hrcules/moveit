import { MongoClient, Db } from "mongodb";

let cachedDb: Db = null!;

export default async function connectToDataBase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = MongoClient.connect(uri);

  const db = (await client).db("moveit");

  cachedDb = db;

  return db;
}
