const User = require("../models/User.model");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ error: "Error fetching users" });
  }
}

async function getUserlById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ error: "Error fetching user by ID" });
  }
}

async function deleteUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    await user.remove();
    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ error: "Error deleting user" });
  }
}

async function updateUserById(req, res) {
  try {
    const { name, role, email, organization } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        email,
        organization,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).json({ error: "Error updating user" });
  }
}

module.exports = {
  getAllUsers,
  getUserlById,
  deleteUserById,
  updateUserById,
};
