const logoutHendler = (req, res) => {
  
  // set to access api 
  res.set('Access-Control-Allow-Origin', '*');

  
  req.session.user = false;
  res.status(200).json({ error: "Successfully Logout" });
};

module.exports = {
  logoutHendler,
};
