const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const postRoutes = require('./routes/posts');
const authRouters = require('./routes/auth');

const app = express();

mongoose
  .connect(
    "mongodb+srv://ayodeleopetumo:esq5gu5Oisl0Kr5i@clusterzuid.gkniv.mongodb.net/zuid-social?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection to DB established!");
  })
  .catch(() => console.log("Connection failed"));

app.use(express.json());

app.use('/images', express.static(path.join('server/images')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRouters);

module.exports = app;
