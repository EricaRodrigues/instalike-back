import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/geminiService.js";

// This function handles GET requests to the '/posts' endpoint
export async function listarPosts(req, res) {
    // Retrieve all posts from the database
    const posts = await getTodosPosts();
    // Send a successful response with the retrieved posts as JSON
    res.status(200).json(posts);
}

// This function handles POST requests to the '/posts' endpoint
export async function postarNovoPost(req, res) {
    // Extract the new post data from the request body
    const novoPost = req.body;
    try {
        // Create a new post in the database
        const postCriado = await atualizarPost(id, post);
        // Send a successful response with the newly created post
        res.status(200).json(postCriado);
    } catch (error) {
        // Log the error message to the console
        console.error(error.message);
        // Send an error response indicating a server-side failure
        res.status(500).json({"Error": "Falha na  requisição"});
    }
}

// This function handles file uploads to create a new post
export async function uploadImagem(req, res) {
    // Create a new post object with the image information
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        // Create a new post in the database
        const postCriado = await criarPost(novoPost);
        // Update the image file name with the post's ID
        const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Rename the uploaded file to the new name
        fs.renameSync(req.file.path, imgAtualizada);
        // Send a successful response with the newly created post
        res.status(200).json(postCriado);
    } catch (error) {
        // Log the error message to the console
        console.error(error.message);
        // Send an error response indicating a server-side failure
        res.status(500).json({"Error": "Falha na  requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    // Extract the new post data from the request body
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;


    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImg,
            description: description,
            alt: req.body.alt,
        };

        // Create a new post in the database
        const postCriado = await atualizarPost(id, post);
        // Send a successful response with the newly created post
        res.status(200).json(postCriado);
    } catch (error) {
        // Log the error message to the console
        console.error(error.message);
        // Send an error response indicating a server-side failure
        res.status(500).json({"Error": "Falha na  requisição"});
    }
}
