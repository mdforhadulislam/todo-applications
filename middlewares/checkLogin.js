const ckeckLogin = (req, res, next) => {
  if (!req.session.user) {
    res.status(404).json({ message: "Create an account or login" });
  } else {
    next();
  }
};

module.exports = {
  ckeckLogin,
};
