const logoutHendler = (req, res) => {
  
  
  req.session.user = false;
  res.status(200).json({ error: "Successfully Logout" });
};

module.exports = {
  logoutHendler,
};
