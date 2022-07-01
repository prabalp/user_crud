const router = require("express").Router();
const {
  UserLogin,
  UserSignup,
  GetUserProfileQuery,
  GetAllUserProfile,
  UpdateUserProfile,
  DeleteUserProfileParameters,
} = require("../controllers/user_controller");

router.route("/login").post(UserLogin);
router.route("/signup").post(UserSignup);
router.route("/getuserprofile").get(GetUserProfileQuery);
router.route("/getalluserprofile").get(GetAllUserProfile);
router.route("/updateuser").post(UpdateUserProfile);
router.route("/delete").delete(DeleteUserProfileParameters);

module.exports = router;
