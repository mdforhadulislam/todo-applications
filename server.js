const express = require("express");
const app = express();
const { ckeckLogin } = require("./middlewares/checkLogin");
// const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// database conectation
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log("contected to database");
  })
  .catch((err) => {
    console.log("can't contected to database");
  });

// middlerwares connects
app.use(cors());
app.use(express.json());

// app.use(
//   session({
//     name: "todo-application-session-key",
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 8800,
//       sameSite: true,
//     },
//   })
// );

// router file imports
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");
const registerRouter = require("./routes/registerRouter");
const todosRouter = require("./routes/todosRouter");

// routes defind
app.use("/auth/register/", registerRouter);
app.use("/auth/login/", loginRouter);
app.use("/auth/logout/", ckeckLogin, logoutRouter);
app.use("/todos/", ckeckLogin, todosRouter);

app.get("/", (req, res) => {
  console.log(req.user);
  res.send("get");
});

app.listen(process.env.PROT || 3000, () => {
  console.log(
    `server is running on http://localhost:${process.env.PORT || 3000}/`
  );
});

// jwt
// meddelweir
