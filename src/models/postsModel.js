import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from "../config/dbConfig.js";

// Establish a database connection using the provided connection string
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Asynchronously retrieves all posts from the specified database collection
export async function getTodosPosts() {
    // Access the database
    const db = conexao.db("imersao-instabytes");
    // Access the 'posts' collection
    const colecao = db.collection("posts");
    // Find all documents in the collection and return them as an array
    return colecao.find().toArray();
}

// Asynchronously creates a new post in the specified database collection
export async function criarPost(novoPost) {
    // Access the database
    const db = conexao.db("imersao-instabytes");
    // Access the 'posts' collection
    const colecao = db.collection("posts");
    // Insert the new post into the collection and return the result
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}