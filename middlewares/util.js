const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  let hashedpassword = bcrypt.hashSync(password, 8);
  return hashedpassword;
};

exports.verifypassword = (password, hashedpassword) => {
  return bcrypt.compareSync(password, hashedpassword);
};

exports.successmessage = (message, payload = true) => {
  return {
    success: true,
    message,
    data: payload,
  };
};
exports.errormessage = (error) => {
  return {
    success: false,
    error,
  };
};
