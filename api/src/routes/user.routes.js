const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserlById,
  deleteUserById,
  updateUserById,
} = require("../controller/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserlById);
router.put("/:id", updateUserById);
router.delete("/", deleteUserById);

module.exports = router;
