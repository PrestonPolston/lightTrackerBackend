// auth/user.js
const express = require("express");
const User = require("../models/user"); // Ensure the path is correct
const router = express.Router();

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

// Simplified route to create a new user
router.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(req);

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Export the router
module.exports = router;
