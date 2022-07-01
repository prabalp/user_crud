const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.generateToken = (userid) => {
  const token = jwt.sign(userid, process.env.JWT_SECRET);
  // const token = jwt.sign(userid, "MYBUDSECRET");
  return token;
};

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
