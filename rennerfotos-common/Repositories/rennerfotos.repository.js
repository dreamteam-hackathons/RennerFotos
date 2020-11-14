const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true }, { useNewUrlParser: true });

module.exports = {
  trySave: async function (newData) {
    await client.connect();
    const collection = client.db("rennerfotos").collection("fotos");
    const result = collection.insertOne(newData);

    console.log((await result).insertedId);
  },
  getAll: async function () {
    let result = [];

    await client.connect();
    const collectionCursor = await client.db("rennerfotos").collection("fotos").find();

    while(await collectionCursor.hasNext())
    {
      let collection = await collectionCursor.next();

      result.push(collection);
    }

    return result;
  }
};
