const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Define database URI
const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/lightTrakr";

// Connect to MongoDB
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Use auth routes
app.use("/auth", require("./auth")); // Make sure the path to your auth router is correct

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for testing purposes
module.exports = app;
