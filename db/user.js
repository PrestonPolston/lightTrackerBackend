const User = require("../models/user");

// get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error retrieving users: " + error.message);
  }
};

// create a new user
const createUser = async (req) => {
  try {
    const { name, email, password, age } = req.body;
    newUser = new User({ name, email, password, age });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating new user: " + error.message);
  }
};

module.exports = { getAllUsers, createUser };
