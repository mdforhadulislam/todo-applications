const { logoutHendler } = require("../controller/logoutHendler");

const Router = require("express").Router();

// get request working
Router.get("/", (req, res) => {});

// post request working
Router.post("/", logoutHendler);

// put request working
Router.put("/", (req, res) => {});

// delete request working
Router.delete("/", (req, res) => {});

module.exports = Router;
