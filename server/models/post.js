const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Post', postSchema)
