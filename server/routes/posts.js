const express = require("express");
const multer = require("multer");

const router = express.Router();

const Post = require("../models/post");
const checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }

    cb(error, "server/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext)
  }
})

router.post("", checkAuth, multer({storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  post
    .save()
    .then((savedPost) => {
      console.log(savedPost);
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...savedPost,
          id: savedPost._id
        },
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Creating post failed!'
      })
    });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery.then((posts) => {
    fetchedPosts = posts
    return Post.count();
  }).then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: fetchedPosts,
        count
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error fetching all posts!'
      })
    });
});

router.put("/:id", checkAuth, multer({storage}).single("image"), (req, res, next) => {
  let url;
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    creator: req.body.userId
  });

  if (req.file) {
    url = req.protocol + '://' + req.get('host');
    post.image = url + '/images/' + req.file.filename
  }


  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: "Update successful",
      });
    } else {
      res.status(401).json({
        message: "Not authorized!",
      });
    }
  }).catch(() => {
    res.status(500).json({
      message: 'Updating post failed!'
    })
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
    .catch((error) => {
      res.status(500).json({
        message: 'Error fetching post!'
      })
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then((d) => {
    console.log(d)
    if (d.deletedCount > 0) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  }).catch((error) => {
    res.status(500).json({
      message: 'Error deleting selected post!'
    })
  });;
});

module.exports = router;
