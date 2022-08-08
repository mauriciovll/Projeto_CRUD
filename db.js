// o Módulo db.js é responsável pela conexão e manipulação do nosso banco de dados, usando o driver nativo do MongoDB.

const {MongoClient} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
  const conn = await MongoClient.connect("mongodb://localhost:27017/");
  if(!conn) return new Error("Can't conect");
  global.db = await conn.db("workshop");
  return global.db;
};

// Função para retornar os clientes cadastrados em nosso banco de dados.Conectamos no banco de dados e fazemos um find sem filtros.
async function findAll(){
  const db = await connect();
  return db.collection("customers").find().toArray();
};

module.exports = {findAll};