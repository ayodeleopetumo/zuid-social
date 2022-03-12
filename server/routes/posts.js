const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.post("", (req, res, next) => {
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

router.get("", (req, res, next) => {
  Post.find()
    .then((doc) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: doc,
      });
    })
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Update successful",
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((d) => {
    res.status(200).json({ message: "Delete method" });
  });
});

module.exports = router;