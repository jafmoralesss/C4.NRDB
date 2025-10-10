require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {

  if (db) return db;
  try {

    await client.connect();
    db = client.db("ClusterForC4");
    console.log("Successfull connection to MongoDB.");
    return db;

  } catch (e) {

    console.error("Failed connection.", e);
    process.exit(1);

  }
}

const getDB = () => db;

module.exports = { connectDB, getDB };