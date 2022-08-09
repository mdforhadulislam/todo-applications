const Router = require("express").Router();
const {
  getListHendler,
  singleGetHendler,
  postHendler,
  putHendler,
  deleteHendler,
} = require("../controller/todoHendler");

// list get todo request working
Router.get("/", getListHendler);

// single get todo request working
Router.get("/:_id", singleGetHendler);

// post request working
Router.post("/", postHendler);

// put request working
Router.put("/:_id", putHendler);

// delete request working
Router.delete("/:_id", deleteHendler);

module.exports = Router;
