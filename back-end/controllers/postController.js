const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/like");
const multer = require("multer");
const path = require("path");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.createPost = async (req, res) => {
  const { description, userId } = req.body;
  // console.log(req.file)
  const imageUrl = `/uploads/${req.file.filename}`;

  const post = new Post({ imageUrl, description, createdBy: userId });
  await post.save();

  await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });

  res.status(201).json(post);
};

exports.getFeed = async (req, res) => {
  const posts = await Post.find().populate('createdBy').populate('likes').populate('comments');
  res.status(200).json(posts);
};

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const likesByUser = await Like.find({
    postId,
    createdBy: userId,
  }).exec();

  if (likesByUser && likesByUser.length > 0) {
    await Like.findByIdAndDelete(likesByUser[0].id).exec();
    post.likes = post.likes.filter((like) => like.id === likesByUser[0].id);
    await post.updateLikesCount();
  } else {
    const like = new Like({ createdBy: userId, postId });
    await like.save();

    post.likes.push(like._id);
    await post.updateLikesCount();
  }

  res.status(200).json(post);
};

exports.commentOnPost = async (req, res) => {
  const { postId } = req.params;
  const { text, userId } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = new Comment({ text, createdBy: userId, postId });
  await comment.save();

  post.comments.push(comment._id);
  await post.save();

  res.status(200).json(post);
};
