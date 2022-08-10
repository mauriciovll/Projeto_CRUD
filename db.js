// o Módulo db.js é responsável pela conexão e manipulação do nosso banco de dados, usando o driver nativo do MongoDB.

const {MongoClient,ObjectId} = require("mongodb");
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

// Função para inserir clientes no banco de dados usando a conexão global e executar um callback ao seu término.
async function insert(customer){
  const db = await connect();
  return db.collection("customers").insertOne(customer);
};

// Função para retornar apenas um cliente, baseado em seu id.
async function findOne(id){
  const db = await connect();
  const objId = new ObjectId(id);
  return db.collection("customers").findOne(objId);
};

// Função para fazer a atualização (update) dos dados inseridos no form
async function update(id,customer){
  const filter = {_id:new ObjectId(id)};
  const db = await connect();
  return db.collection("customers").updateOne(filter, {$set:customer});
};

// Função para deletar dados inseridos no banco.
async function deleteOne(id){
  const db = await connect();
  const filter = {_id:new ObjectId(id)};
  return db.collection("customers").deleteOne(filter);
};

module.exports = {findAll, insert, findOne, update, deleteOne};