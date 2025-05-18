const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Schema/userSchema");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contactNumber, birthDate } =
      req.body;
    console.log(req?.file?.path);

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      contactNumber,
      birthDate,
      profileImage: req?.file?.path,
    });

    res
      .status(201)
      .json({ success: true, message: "User Created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      isDeleted: false,
    }).lean();

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      res
        .status(400)
        .json({ success: true, message: "Invalid Password or email" });
    }

    const token = jwt.sign({ _id: user?._id }, "afgafacaf", {
      expiresIn: "3d",
    });
    const userData = { ...user, token };

    res.status(201).json({
      success: true,
      data: userData,
      message: "USer logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    res.status(201).json({
      success: true,
      data: user,
      message: "Profile fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
