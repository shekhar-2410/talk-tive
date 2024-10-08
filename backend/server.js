const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./src/routess/userRoutes");
const chatRoutes = require("./src/routess/chatRoutes");
const app = express();
const cors = require("cors");
const path = require('path');
// Connect to the database
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
