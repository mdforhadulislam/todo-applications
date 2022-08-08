const Router = require("express").Router();
const { loginHendler } = require("../controller/loginHendler");
// get request working
Router.get("/", (req, res) => {});

// post request working
Router.post("/", loginHendler);

// put request working
Router.put("/", (req, res) => {});

// delete request working
Router.delete("/", (req, res) => {});

module.exports = Router;
