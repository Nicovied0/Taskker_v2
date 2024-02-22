const axios = require("axios");
const generateProfile = require("../middlewares/generateProfile");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required: name, email, password" });
    }

    const response = await axios.post(
      `${process.env.URL_MICROSERVICES}/auth/register`,
      {
        name,
        email,
        password,
      }
    );

    // Use 'await' here to ensure 'generateProfile' completes before moving on
    generateProfile(req, res, () => {
      return res.status(response.status).json(response.data);
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ error: "Error registering user" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required:  email, password" });
    }
    const response = await axios.post(
      `${process.env.URL_MICROSERVICES}/auth/login`,
      {
        email,
        password,
      }
    );

    // Use 'await' here to ensure 'generateProfile' completes before moving on
    generateProfile(req, res, () => {
      return res.status(response.status).json(response.data);
    });
  } catch (error) {
    console.error("Error login user:", error.message);
    return res.status(500).json({ error: "Error login user" });
  }
}

async function getProfile(req, res) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const config = {
      headers: { token: `${token}` },
    };

    const response = await axios.get(
      `${process.env.URL_MICROSERVICES}/auth/profile`,
      config
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error getting user profile:", error.message);
    return res.status(500).json({ error: "Error getting user profile" });
  }
}

module.exports = { registerUser, loginUser, getProfile };
