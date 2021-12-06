const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.post("", UserController.signup);
router.post("/login",UserController.login);
router.get("/:userId",UserController.getUser);
module.exports = router;