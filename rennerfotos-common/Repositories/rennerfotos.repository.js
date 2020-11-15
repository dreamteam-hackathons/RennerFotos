const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true }, { useNewUrlParser: true });

module.exports = {
  trySavePhotos: async (newData) => {
    await client.connect();
    const collection = client.db("rennerfotos").collection("fotos");
    const result = collection.insertOne(newData);

    console.log((await result).insertedId);
  },
  getAllPhotos: async () => {
    let result = [];

    await client.connect();
    const collectionCursor = await client.db("rennerfotos").collection("fotos").find();

    while(await collectionCursor.hasNext())
    {
      let collection = await collectionCursor.next();

      result.push(collection);
    }

    return result;
  },
  getPedido: () => {
    const pedidos = [
      "Calça Sarja com Puídos Azul",
      "Blusa Manga Curta Bufante Decote V Frente e Costas",
      "Jardineira Curta Jeans Curve Azul"
    ];

    const pedido = pedidos[Math.floor(Math.random() * pedidos.length)];

    return pedido;
  }
};