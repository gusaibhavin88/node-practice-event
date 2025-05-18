const {
  register,
  logIn,
  getProfile,
} = require("../controller/auth.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../utility/multer");

const authRouter = require("express").Router();

authRouter.post("/register", upload.single("profileImage"), register);
authRouter.post("/login", logIn);
authRouter.get("/profile", authMiddleware, getProfile);
module.exports = authRouter;
