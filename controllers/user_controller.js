const User = require("../models/user_model");
const {
  successmessage,
  hashPassword,
  verifypassword,
  errormessage,
} = require("../middlewares/util");

module.exports.UserSignup = async (req, res) => {
  try {
    const user_data = req.body;
    const user = await User.findOne({ email: user_data["Email"] });

    if (user) {
      return res
        .status(200)
        .json(successmessage("User already exists!", user_data["Email"]));
    }

    const newPassword = hashPassword(user_data["Password"]);
    user_data["Password"] = newPassword;
    user_data["LastLoginDate"] = Date.now;

    const createUser = await User.create(user_data);

    // const token = generateToken(JSON.stringify(createUser._id));

    return res
      .status(200)
      .json(successmessage("Registered Successfuly!", createUser._id));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

module.exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ Email: email }).select("Password");

    if (!user) {
      return res.status(200).json(errormessage("User does not exists"));
    }

    const verify = verifypassword(password, user.Password);

    if (!verify) {
      //update the login time ;
      return res.status(200).json(errormessage("Invalid Credentials"));
    }

    // const token = generateToken(JSON.stringify(user._id));

    return res
      .status(200)
      .json(successmessage("Logged In Successfuly!", user._id));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

module.exports.GetUserProfile = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);

    return res
      .status(200)
      .json(successmessage("Fetched Successfuly!", getUser));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

//a api to get user from email and phone number

module.exports.GetAllUserProfile = async (req, res) => {
  try {
    const getUser = await User.find({});
    return res
      .status(200)
      .json(successmessage("Fetched Successfuly!", getUser));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

module.exports.UpdateUserProfile = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res
      .status(200)
      .json(successmessage("Updated Successfuly!", updateUser));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

module.exports.DeleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    return res.status(200).json(successmessage("User", user));
  } catch (error) {
    return res.status(400).json(errormessage(error.message));
  }
};
