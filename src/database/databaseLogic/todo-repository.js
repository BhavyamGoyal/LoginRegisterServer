const { TodoModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");
//Dealing with data base operations
class TodoRepository {
  async CreateTodo({ title, desc, user }) {
    try {
      const todo = new TodoModel({
        title,
        desc,
        user,
      });

      const todoResult = await todo.save();
      return todoResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Todo"
      );
    }
  }

  async Todos() {
    try {
      return await TodoModel.find();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Todos"
      );
    }
  }

  async FindById(id) {
    try {
      return await TodoModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Todo"
      );
    }
  }

  async DeleteById(id) {
    try {
      return await TodoModel.remove({ _id: id });
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Todo"
      );
    }
  }
  async UpdateTodo(Id, updateData) {
    try {
      const todo = await TodoModel.findByIdAndUpdate({ _id: Id }, updateData, {
        new: true,
      });
      return todo;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Todo"
      );
    }
  }
  async MarkTodoAsCompleted(Id) {
    try {
      const todo = await TodoModel.findByIdAndUpdate(
        { _id: Id },
        { isComplete: true },
        { new: true }
      );
      return todo;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Todo"
      );
    }
  }
}

module.exports = TodoRepository;
