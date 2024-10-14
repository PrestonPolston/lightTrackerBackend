// auth/user.js
const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Route to create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const newUser = new User({ name, email, password, age });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

module.exports = router;
