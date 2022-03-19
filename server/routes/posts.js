const express = require("express");

const router = express.Router();

// Middlewares
const checkAuth = require('../middleware/check-auth');
const fileUploader = require('../middleware/file-upload');

// Controllers
const PostController = require('../controllers/post');

router.post("", checkAuth, fileUploader, PostController.createPost);

router.get("", PostController.getAllPosts);

router.put("/:id", checkAuth, fileUploader, PostController.updatePost);

router.get("/:id", PostController.getSinglePost);

router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
