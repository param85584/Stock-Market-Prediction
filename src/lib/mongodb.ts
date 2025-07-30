import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {
  tls: true,
  tlsInsecure: false,
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  maxIdleTimeMS: 30000,
  maxPoolSize: 10,
};

let client;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;