const asyncHandler = require("express-async-handler");
const User = require("../modals/userModal");
const signToken = require("../../config/jwtToken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const picture = req.file ? req.file.path : null;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all the fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({
    name,
    email,
    password,
    picture,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      picture: savedUser.picture,
      token: signToken(savedUser._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create the user" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: signToken(user._id),
    });
  } else {
    // Invalid email or password
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, upload, authUser, allUsers };
