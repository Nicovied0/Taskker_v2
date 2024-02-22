const axios = require("axios");
const User = require("../models/User.model");

async function generateProfile(req, res, next) {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const usersResponse = await axios.get(
        `${process.env.URL_MICROSERVICES}/user`
      );
      const user = usersResponse.data.find((user) => user.email === email);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newUser = new User({
        name: user.name,
        email: user.email,
        userIdRegister: user._id,
        organization: "",
      });
      await newUser.save();
    }

    next();
  } catch (error) {
    console.error("Error generating profile:", error.message);
    return res.status(500).json({ error: "Error generating profile" });
  }
}

module.exports = generateProfile;
