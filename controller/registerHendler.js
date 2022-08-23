const uuid = require("uuid");
const { convartHash } = require("../common");
const User = require("../models/User");

const registerHendler = async (req, res) => {
  let isRegister = false;
  try {
    const { name, username, email, password } = req.body;

    const emailToFindUser = await User.findOne({ email });
    const userNameToFindUser = await User.findOne({ username });
    if (emailToFindUser) {
      res.status(403).json({ error: "This Email Alrady Used" });
    }
    if (userNameToFindUser) {
      res.status(403).json({ error: "This Username Alrady Used" });
    }
    if (emailToFindUser && userNameToFindUser) {
      res.status(403).json({ error: "This email and username alrady used" });
    }
    if (!emailToFindUser && !userNameToFindUser) {
      isRegister = !isRegister;
    }

    if (isRegister && name && username && email && password) {
      const user = new User({
        name: name,
        username: username,
        email: email,
        password: convartHash(password),
      });
      const newUser = await user.save();

      res.status(200).json(newUser);
    } else {
      res.status(403).json({ error: "There was a problem in your request" });
    }
  } catch (error) {
    res.status(500).json({ error: "There was a server said problem" });
  }
};

module.exports = {
  registerHendler,
};
