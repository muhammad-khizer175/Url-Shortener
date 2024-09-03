const express = require("express");
const {
  handleCreateNewShortUrl,
  handleTotalClicks,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleCreateNewShortUrl);
router.get("/analytics/:shortId", handleTotalClicks);

module.exports = router;
