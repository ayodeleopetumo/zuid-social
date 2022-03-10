const express = require("express");
const mongoose = require("mongoose");

// Schemas
const Post = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://ayodeleopetumo:esq5gu5Oisl0Kr5i@clusterzuid.gkniv.mongodb.net/zuid-social?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => console.log("Connection failed"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post
    .save()
    .then((savedPost) => {
      res.status(201).json({
        message: "Post added successfully",
        post: savedPost,
      });
    })
    .catch(() => console.log("Error saving post"));
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((doc) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: doc,
      });
    })
    .catch((error) => console.log(error));
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((d) => {
    res.status(200).json({ message: "Delete method" });
  });
});

module.exports = app;
