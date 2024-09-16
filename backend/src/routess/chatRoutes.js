const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controllers/chatController");
router.route("/").post(protect,accessChat);
// router.route("/").get(protect,fetchChats);
// router.route("/group").post(protect,createGroupChat);
// router.route("/rename").put(protect,renamGroupChat);
// router.route("/groupremove").put(protect,removefromGroup);
// router.route("/groupadd").put(protect,addtoGroup);

module.exports = router