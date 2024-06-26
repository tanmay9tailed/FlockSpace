const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Post' },

});

module.exports = mongoose.model('Comment', CommentSchema);
