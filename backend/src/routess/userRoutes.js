const express = require("express");
const router = express.Router();
const {
  registerUser,
  upload,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(upload.single("pic"), registerUser).get(protect,allUsers);
router.post("/login", authUser);

module.exports = router;
