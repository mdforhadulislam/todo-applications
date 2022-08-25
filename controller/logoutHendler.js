const logoutHendler = (req, res) => {
  res.user = false;
  res.status(200).json({ error: "Successfully Logout" });
};

module.exports = {
  logoutHendler,
};
