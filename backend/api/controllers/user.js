const User = require("../models/user");
const base = require("./base");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = base.getAll(User);

exports.getUser = base.getOne(User);

exports.createUser = base.createOne(User);

exports.deleteUser = base.deleteOne(User);

exports.updateUser = async (req, res, next) => {
  try {
    const { _id, password } = req.body;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }
    const data = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data)
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.updateVerificationStatus = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const id = req.user._id;
    const data = await User.findByIdAndUpdate(
      id,
      { verificationStatus: true }, // Update verificationStatus to true
      { new: true, runValidators: true }
    );

    if (!data)
      return res.status(404).json({ status: "fail", message: "User not found" });

    const token = createToken(data); // Create token using data._id
    res.status(200).json({
      status: "success",
      token,
      data: { user: data },
    });
  } catch (error) {
    res.status(200).json({
      token,
      data: { user: error },
    });
  }
};
