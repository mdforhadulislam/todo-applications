const { convartHash, compare } = require("../common");
const User = require("../models/User");

const loginHendler = async (req, res) => {
  if (!req.session.user) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        if (compare(password, user.password)) {
          req.session.user = {
            email: user.email,
            username: user.username,
          };
          res
            .status(200)
            .json({ message: "Successfully Login", cookie:{...req.session} });
          return;
        } else {
          res.status(403).json({ error: "password Is not Mathch" });
        }
      } else {
        res.status(403).json({ error: "Email Is not Mathch" });
      }
    } catch (error) {
      res.status(500).json({ error: "There was a server said problem" });
    }
  } else {
    res.status(404).json({ error: "You are alrady login" });
  }
};

module.exports = {
  loginHendler,
};
