const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const userData = new User({
      email: req.body.email,
      password: hash,
    });
    userData
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Invalid auth credentials!'
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let returnedUser;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed - no user",
        });
      }
      returnedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (result.statusCode === 401) {
        return res.status(401).json({
          message: "Auth failed - no result",
        });
      }
      const token = jwt.sign(
        { email: returnedUser.email, userId: returnedUser._id },
        "this_should_be_a_longer_secret_key",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token,
        expiresIn: 3600,
        userId: returnedUser._id,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Invalid auth credentials!",
      });
    });
});

module.exports = router;
