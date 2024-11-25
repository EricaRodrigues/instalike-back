// Import the express module for creating the web server
import express from "express";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

// Import functions for listing posts, creating new posts, and uploading images from the postsController file
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Import the multer module for handling file uploads
import multer from "multer";

// Configure disk storage for multer
const storage = multer.diskStorage({
  // Define the destination directory for uploaded files (./uploads in this case)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define the filename for uploaded files (original filename is used here)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Create a multer instance with the defined storage configuration
const upload = multer({ dest: "./uploads", storage });

// Define a function to register routes on an Express application
const routes = (app) => {
  // Apply middleware to parse incoming JSON data in requests
  app.use(express.json());
  app.use(cors(corsOptions));

  // Route handler for GET requests to "/posts" endpoint (presumably retrieves a list of posts)
  app.get("/posts", listarPosts);

  // Route handler for POST requests to "/posts" endpoint (presumably creates a new post)
  app.post("/posts", postarNovoPost);

  // Route handler for POST requests to "/upload" endpoint 
  // - Uses the `upload.single("imagem")` middleware to handle a single file named "imagem"
  // - Calls the `uploadImagem` function after successful upload
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};


// Export the routes function as the default export of this module
export default routes;