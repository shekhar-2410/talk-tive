const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat,renamGroupChat,addtoGroup,removefromGroup } = require("../controllers/chatController");
router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renamGroupChat);
router.route("/groupadd").put(protect,addtoGroup);
router.route("/groupremove").put(protect,removefromGroup);

module.exports = router