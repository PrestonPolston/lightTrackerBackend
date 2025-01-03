const bcrypt = require("bcrypt");
const User = require("../models/user");

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error retrieving users: " + error.message);
  }
};

//Login user
const userLogin = async (req) => {
  try {
    //temporary token we will later implement JWT
    let tempToken = true;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // checking for valid password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      tempToken = true;
    } else {
      throw new Error("Invalid password");
    }
    return { user, tempToken };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Create a new user
const createUser = async (req) => {
  try {
    const { name, email, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, age });
    await newUser.save();
    return {
      message: "User created successfully!",
      user: newUser,
    };
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
      user.password = await bcrypt.hash(password, 10);
    }
    if (age) {
      user.age = age;
    }

    await user.save();
    return { user, message: "User updated successfully!" };
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

// Delete user information
const deleteUser = async (req) => {
  try {
    const { email } = req.body;
    const result = await User.deleteOne({ email });
    if (result.deletedCount === 0) {
      throw new Error("No user found with that email.");
    }
    return { message: "successfully deleted user." };
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

module.exports = { getAllUsers, userLogin, createUser, updateUser, deleteUser };
