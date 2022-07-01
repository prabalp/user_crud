const User = require("../models/user_model");
const {
  successmessage,
  generateToken,
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
    user_data["LastLoginDate"] = Date.now();

    const createUser = await User.create(user_data);

    const token = generateToken(JSON.stringify(createUser._id));

    return res
      .status(200)
      .json(successmessage("Registered Successfuly!", token));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

module.exports.UserLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email: Email }).select("Password");

    if (!user) {
      return res.status(200).json(errormessage("User does not exists"));
    }

    const verify = verifypassword(Password, user.Password);

    if (!verify) {
      //update the login time ;
      return res.status(200).json(errormessage("Invalid Credentials"));
    }
    await User.findOneAndUpdate(
      user._id,
      { LastLoginDate: Date.now() },
      {
        new: true,
        runValidators: true,
      }
    );
    const token = generateToken(JSON.stringify(user._id));

    return res
      .status(200)
      .json(successmessage("Logged In Successfuly!", token));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

// module.exports.GetUserProfile = async (req, res) => {
//   try {
//     const getUser = await User.findById(req.params.id);

//     return res
//       .status(200)
//       .json(successmessage("Fetched Successfuly!", getUser));
//   } catch (err) {
//     return res.status(400).json(errormessage(err.message));
//   }
// };

//a api to get user from email and phone number
module.exports.GetUserProfileQuery = async (req, res) => {
  try {
    const getUser = await User.find(req.query);

    return res
      .status(200)
      .json(successmessage("Fetched Successfuly!", getUser));
  } catch (err) {
    return res.status(400).json(errormessage(err.message));
  }
};

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
    const updateUser = await User.findOneAndUpdate(req.query, req.body, {
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

module.exports.DeleteUserProfileParameters = async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.query);
    return res.status(200).json(successmessage("User", user));
  } catch (error) {
    return res.status(400).json(errormessage(error.message));
  }
};
