const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
require("dotenv").config();

const app = express();
app.use(express.json());

connectToMongoDB();

app.get("/", (req, res) => {
  console.log("Request received");
  res.send("API working properly");
});

app.use("/api/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const originalUrl = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!originalUrl) return res.status(404).json({ error: "URL not found" });
  res.redirect(originalUrl.redirectLink);
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
