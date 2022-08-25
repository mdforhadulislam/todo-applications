const { convartHash, compare } = require("../common");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const loginHendler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (compare(password, user.password)) {
        const token = await jwt.sign(
          { email: user.email, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        req.user = { username: user.username, email: user.email };

        res.status(200).json({
          message: "Successfully Login",
          token: token,
        });
        return;
      } else {
        res.status(403).json({ error: "password Is not Mathch" });
      }
    } else {
      res.status(403).json({ error: "Email Is not Mathch" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was a server said problem" });
  }
};

module.exports = {
  loginHendler,
};
