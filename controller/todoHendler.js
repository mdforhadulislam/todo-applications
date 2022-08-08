const Todo = require("../models/Todo");

// all todo get
const getListHendler = async (req, res) => {
  try {
    const todos = await Todo.find();
    const filterCurrentUserTodo = todos.filter(
      (item) =>
        item.user.email === req.session.user.email &&
        item.user.username === req.session.user.username
    );

    // this statement working filter done todo value true
    if (req.query.done === "true") {
      const doneTodo = filterCurrentUserTodo.filter(
        (todo) => todo.done === true
      );
      res.status(200).json(doneTodo);

      // this statement working filter done todo value false
    } else if (req.query.done === "false") {
      const doneTodo = filterCurrentUserTodo.filter(
        (todo) => todo.done === false
      );
      res.status(200).json(doneTodo);

      // this statement working filter update todo sent user
    } else if (req.query.update === "true") {
      const updateTodo = filterCurrentUserTodo.filter(
        (todo) => todo.createdAt.toString() !== todo.updatedAt.toString()
      );
      res.status(200).json(updateTodo);

      // this statement working filter no update todo sent user
    } else if (req.query.update === "false") {
      const updateTodo = filterCurrentUserTodo.filter(
        (todo) => todo.createdAt.toString() === todo.updatedAt.toString()
      );
      res.status(200).json(updateTodo);

      // this is working user request no query and user hit root todo api url
    } else {
      if (filterCurrentUserTodo.length === 0) {
        return res.status(404).json({
          message: "No todo found",
        });
      }
      return res.status(200).json(filterCurrentUserTodo);
    }
  } catch (error) {
    res.status(404).json({ message: "There was a problem in your request" });
  }
};

// single todo get
const singleGetHendler = async (req, res) => {
  try {
    const { _id } = req.params;
    const todo = await Todo.findById(_id);

    if (todo) {
      return res.status(200).json(todo);
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(404).json({ message: "There was a problem in your request" });
  }
};

// create todo
const postHendler = async (req, res) => {
  const { task, done } = req.body;
  try {
    if (task && done) {
      const todo = new Todo({
        task: task,
        done: done,
        user: {
          email: req.session.user.email,
          username: req.session.user.username,
        },
      });
      const newTodo = await todo.save();
      res.status(200).json(newTodo);
    } else {
      res.status(404).json({ message: "There was a problem in your request" });
    }
  } catch (error) {
    res.status(500).json({ message: "There was a server side problem " });
  }
};

// update todo
const putHendler = async (req, res) => {
  try {
    const { _id } = req.params;
    const todo = await Todo.findById(_id);
    if (todo.user.email === req.session.user.email) {
      todo.task = req.body.task;
      todo.done = req.body.done;

      const updateTodo = await todo.save();

      res.status(200).json(updateTodo);
    } else {
      res.status(404).json({ message: "You are not update this todo" });
    }
  } catch (error) {
    res.status(500).json({ message: "There was a server side problem " });
  }
};

const deleteHendler = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(_id);

    if (deletedTodo.user.email === req.session.user.email) {
      if (deletedTodo) {
        return res
          .status(200)
          .json({ message: "todo Deleted", todo: deletedTodo });
      } else {
        return res.status(404).json({ message: "No todo found" });
      }
    } else {
      res
        .status(404)
        .json({ message: "you are not allow to delete this todo" });
    }
  } catch (error) {
    console.log(error);
    //  res.status(404).json({ message: "There was a server side problem " });
  }
};

module.exports = {
  getListHendler,
  singleGetHendler,
  postHendler,
  putHendler,
  deleteHendler,
};
