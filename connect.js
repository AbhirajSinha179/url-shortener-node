const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { connectToMongoDB };
