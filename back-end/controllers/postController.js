const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/like");
const multer = require("multer");
const path = require("path");
const { getSocketInstance } = require("../socket");

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
  const { userId } = req.query;
  const posts = await Post.find().populate("createdBy").populate("likes").populate("comments").exec();
  const responsePosts = posts.map((post) => {
    const like = post.likes.find((like) => like.createdBy === userId);
    // console.log("userId", userId)
    // console.log("Like", post.likes);
    return {
      _id: post._id,
      comments: post.comments,
      createdAt: post.createdAt,
      createdBy: post.createdBy,
      description: post.description,
      imageUrl: post.imageUrl,
      likesCount: post.likesCount,
      likedByUser: !!post.likes.find((like) => like.createdBy === userId),
    };
  });
  res.status(200).json(responsePosts);
};

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const io = getSocketInstance().getSocket();

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const like = await Like.findOne({ postId, createdBy: userId });
    if (like) {
      await Like.findByIdAndDelete(like._id);
      post.likes = post.likes.filter((likeId) => likeId.toString() !== like._id.toString());
      await post.save();
      await post.updateLikesCount();
      io.emit("like_change", {
        isLike: false,
        postId,
        userId,
        likesCount: post.likesCount,
      });

      return res.status(200).json({ message: "Post unliked successfully" });
    } else {
      const newLike = new Like({ postId, createdBy: userId });
      await newLike.save();
      post.likes.push(newLike._id);
      await post.save();
      await post.updateLikesCount();
      console.log(io);
      io.emit("like_change", {
        isLike: true,
        postId,
        userId,
        likesCount: post.likesCount,
      });
      return res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    return res.status(500).json({ message: "Server error" });
  }
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
