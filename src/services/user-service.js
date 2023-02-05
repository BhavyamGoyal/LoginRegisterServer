const { UserRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const { APIError, BadRequestError } = require("../utils/app-errors");

// All Business logic will be here
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    try {
      const existingUser = await this.repository.FindUser({ email });
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );

        if (validPassword) {
          const token = await GenerateSignature({
            userRole: existingUser.userRole,
            email: existingUser.email,
            _id: existingUser._id,
            id: existingUser._id,
          });
          return FormateData({ id: existingUser._id, token });
        }
      } else {
        throw new APIError("User Not found", 404, "no user with this email");
      }
    } catch (err) {
      throw new APIError("Data Not found", 404, err);
    }
  }

  async SignUp(userInputs) {
    const { email, password, phone, name } = userInputs;

    try {
      // create salt
      let salt = await GenerateSalt();

      let userPassword = await GeneratePassword(password, salt);

      const existingUser = await this.repository.CreateUser({
        email,
        password: userPassword,
        phone,
        name,
        salt,
      });

      const token = await GenerateSignature({
        email: email,
        _id: existingUser._id,
      });

      return FormateData({ id: existingUser._id, token });
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProfile(id, page, limit) {
    try {
      const existingUser = await this.repository.FindUserById({
        id,
        page,
        limit,
      });
      return FormateData(existingUser);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    switch (event) {
      case "ADD_TODO":
        this.repository.AddTodo(data);
        break;
      case "DELETE_TODO":
        this.repository.DeleteTodo(data);
        break;
      default:
        break;
    }
  }
}

module.exports = UserService;
