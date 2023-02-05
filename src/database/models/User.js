const mongoose = require("mongoose");
const USER_TYPES = require("../../constants/enums").USERS;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    salt: String,
    phone: String,
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    passwordAttempts: {
      type: Number,
      default: 0,
    },
    userRole: {
      type: String,
      default: USER_TYPES.USER,
    },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
