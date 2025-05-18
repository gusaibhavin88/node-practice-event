const jwt = require("jsonwebtoken");
const User = require("../Schema/userSchema");

exports.authMiddleware = async (req, res, next) => {
  try {
    let token = req?.headers?.token || req?.headers?.authorization;

    if (!token) {
      res.status(400).json({ message: "unauthotized" });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, "afgafacaf");

    const user = await User.findById(decoded?._id).lean();

    if (!user) {
      res.status(400).json({ message: "unauthotized" });
    }

    req["user"] = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "unauthotized" });
  }
};
