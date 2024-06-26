const User = require("../models/user");
const Post = require("../models/post");


// Create a new user
exports.createUser = async (req, res) => {

  const { username,password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const user = new User({ username,password });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

// Get a user by Username
exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.find({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user", error });
  }
};

// Get all posts by a user
exports.getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // const posts = await Post.find({ createdBy: userId }).populate("createdBy").populate("likes").populate("comments");
    const posts = await User.findById(userId).populate("posts")
    // console.log(posts)
    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: "Error fetching posts", error });
  }
};

