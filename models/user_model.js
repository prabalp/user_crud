const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  LastLoginDate: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);
