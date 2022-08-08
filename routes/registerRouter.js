const Router = require("express").Router();
const { registerHendler } = require("../controller/registerHendler");

// get request working
Router.get("/", (req, res) => {});

// post request working
Router.post("/", registerHendler);

// put request working
Router.put("/", (req, res) => {});

// delete request working
Router.delete("/", (req, res) => {});

module.exports = Router;
