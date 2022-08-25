const jwt = require("jsonwebtoken");

const ckeckLogin = (req, res, next) => {
  try {
    const { headers } = req;
    const token = headers.authorization;
    const { username, email } = jwt.verify(token, process.env.JWT_SECRET);
    if (username === req.user.username && email === req.user.email) {
      next();
    } else {
      next("Authentication failed!");
    }
  } catch {
    next("Authentication failed!");
  }
};

module.exports = {
  ckeckLogin,
};
