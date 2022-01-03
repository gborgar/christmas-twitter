const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    require: [true, 'Text is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: [true, 'User id is required']
  },
  likes: {
    type: Number,
    default: 0
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;