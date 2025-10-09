const express = require('express');
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://jafmoralesss:MyPassword@clusterforC4.sjhdjh4.mongodb.net/ClusterForC4";
const client = new MongoClient(uri);

const app = express();
const PORT = 3000;

async function main() {

  try {

    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const database = client.db("ClusterForC4");
    const collection = database.collection("Trial collection")

    app.get('/api/data', async(req, res) => {
      
      try{
        const documents = await collection.find({}).toArray();
        res.json(documents);
      } catch (e){
        res.status(500).send("Error when feching.");
      }

    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (e) {
    console.error (e);
  }
}

main();