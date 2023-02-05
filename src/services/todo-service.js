const { TodoRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class TodoService {
  constructor() {
    this.repository = new TodoRepository();
  }

  async CreateTodo(todoInputs) {
    try {
      const todoResult = await this.repository.CreateTodo(todoInputs);
      return FormateData(todoResult);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async DeleteTodo(todoId) {
    try {
      const todoResult = await this.repository.DeleteById(todoId);
      return FormateData(todoResult);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetTodos() {
    try {
      const todos = await this.repository.Todos();
      return FormateData({
        todos,
      });
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetTodoById(todoId) {
    try {
      return await this.repository.FindById(todoId);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async UpdateTodo(id,{title,desc}) {
    try {
        var updateQuery = {}
        if(title){
            updateQuery['title']=title;
        }
        if(desc){
            updateQuery['desc']=desc;
        }
      return await this.repository.UpdateTodo(id,updateQuery);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async MarkTodoAsCompleted(todoId) {
    try {
      return await this.repository.MarkTodoAsCompleted(todoId);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }
}

module.exports = TodoService;
