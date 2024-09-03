const URL = require("../models/url");
var nanoId = require("nano-id");

let handleCreateNewShortUrl = async (req, res) => {
  if (!req.body.url) {
    return res.status(404).json({ error: "url is required" });
  }
  let shortId = nanoId(8);

  await URL.create({
    shortId: shortId,
    redirectUrl: req.body.url,
    visitHistory: [],
    generatedBy: req.user.id,
  });
  res.render("home", { id: shortId });
};

let handleTotalClicks = async (req, res) => {
  let shortId = req.params.shortId;
  let result = await URL.findOne({ shortId });
  res.json({ totalClicks: result.visitHistory.length });
};

module.exports = {
  handleCreateNewShortUrl,
  handleTotalClicks,
};
