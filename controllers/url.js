const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectLink: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) return res.status(404).json({ error: "URL not found" });
  const visitHistory = entry.visitHistory;
  return res.status(200).json({ visitHistory, totalVisits: visitHistory.length });
}

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
