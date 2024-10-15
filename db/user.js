const User = require("../models/user"); // It's sufficient to have this line once

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error retrieving users: " + error.message);
  }
};

// Create a new user
const createUser = async (req) => {
  try {
    const { name, email, password, age } = req.body;
    const newUser = new User({ name, email, password, age });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating new user: " + error.message);
  }
};

// Update user information
const updateUser = async (req) => {
  try {
    const { email, name, password, age } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User Not Found");
    }

    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }
    if (age) {
      user.age = age;
    }

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

module.exports = { getAllUsers, createUser, updateUser };
