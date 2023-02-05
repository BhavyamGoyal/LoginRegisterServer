const { UserModel, AddressModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ email, password, phone, salt, name }) {
    try {
      const user = new UserModel({
        name,
        email,
        password,
        salt,
        phone,
        address: [],
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create User"
      );
    }
  }

  async FindUser({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async FindUserById({ id, page, limit }) {
    try {
      const existingUser = await UserModel.findById(id).populate({
        path: "todos",
        options: {
          sort: { createdAt: 1 },
          skip: limit * (page - 1),
          limit: limit,
        },
      });
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async AddTodo({ todoId, userId }) {
    try {
      const existingUser = await UserModel.updateOne(
        { _id: userId },
        { $pull: { todos: todoId } }
      );
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async DeleteTodo({ todoId, userId }) {
    try {
      const existingUser = await UserModel.updateOne(
        { _id: userId },
        { $push: { todos: todoId } }
      );
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }
}

module.exports = UserRepository;
