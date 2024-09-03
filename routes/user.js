const express = require("express");
const { handleUserSignIn, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignIn);
router.post("/login", handleUserLogin);

module.exports = router;
