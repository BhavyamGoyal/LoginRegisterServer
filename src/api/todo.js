const TodoService = require("../services/todo-service");
const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new TodoService();
  const userService = new UserService();

  app.post("/todo", UserAuth, async (req, res, next) => {
    try {
      const { title, desc } = req.body;
      const { data } = await service.CreateTodo({
        title,
        desc,
        user: req.user.id,
      });
      console.log(data.id);
      userService.SubscribeEvents({
        event: "ADD_TODO",
        data: { todoId: data.id, userId: req.user.id },
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/todo/:id", UserAuth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const { title, desc } = req.body;
      // validation
      const { data } = await service.UpdateTodo(id, {
        title,
        desc,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/todo/:id", UserAuth, async (req, res, next) => {
    const todoId = req.params.id;
    try {
      const { data } = await service.MarkTodoAsCompleted(todoId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.put("/todo/complete/:id", UserAuth, async (req, res, next) => {
    const todoId = req.params.id;
    try {
      const { data } = await service.GetTodoById(todoId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/todo/:id", UserAuth, async (req, res, next) => {
    const todoId = req.params.id;
    try {
      const { data } = await service.DeleteTodo(todoId);
      userService.SubscribeEvents({
        event: "DELETE_TODO",
        data: { todoId, userId: req.user.id },
      });
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
