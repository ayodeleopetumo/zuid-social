const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
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
      .catch(() => {
        res.status(500).json({
          message: "Invalid auth credentials!",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
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
        process.env.JWT_KEY,
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
    .catch(() => {
      return res.status(500).json({
        message: "Invalid auth credentials!",
      });
    });
};
