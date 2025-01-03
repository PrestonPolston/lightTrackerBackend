const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  userLogin,
  createUser,
  updateUser,
  deleteUser,
} = require("../db/user");

// Route to create a new user
router.post("/users", async (req, res) => {
  try {
    const result = await createUser(req);
    console.log("User created:", result.user);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);

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
    const users = await getAllUsers();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

//Route to login user
router.post("/users/login", async (req, res) => {
  try {
    const { user, tempToken } = await userLogin(req);
    res.status(200).json({ user, tempToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Route to update user
router.put("/users", async (req, res) => {
  try {
    const updatedUser = await updateUser(req);
    console.log("User updated:", updatedUser);
    res
      .status(200)
      .json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(404)
      .json({ message: "Error updating user", error: error.message });
  }
});

// Route to delete user
router.delete("/users", async (req, res) => {
  try {
    const removeUser = await deleteUser(req);
    console.log(removeUser);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing user:", error);
    res
      .status(404)
      .json({ message: "Error removing user", error: error.message });
  }
});

module.exports = router;
