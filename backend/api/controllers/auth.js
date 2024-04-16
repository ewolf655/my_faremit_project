const jwt = require("jsonwebtoken");
const User = require("../models/user");
const OTP = require("../models/otpModels");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Enter username and password",
      });
    }

    const userData = await User.findOne({ name }).select("+password");
    console.log(userData);

    if (!userData) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }

    const loggedIn = await userData.checkPassword(password, userData.password);

    if (!loggedIn) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid password",
      });
    }
    const token = createToken(userData);

    res.status(200).json({
      status: "success",
      token,
      data: { user: userData },
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      password,
      Email,
      postalCode,
      fullName,
      city,
      address,
      country,
      userOTP,
    } = req.body;
    console.log(req.body);

    const missingFields = [];

    // Check if all details are provided
    if (!password) missingFields.push("password");
    if (!Email) missingFields.push("Email");

    if (!fullName) missingFields.push("fullName");

    if (!userOTP) missingFields.push("userOTP");

    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.join(", ");
      return res.status(403).json({
        success: false,
        message: `Required fields are missing: ${missingFieldsMessage}`,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ Email }],
    });

    if (existingUser) {
      let message = "User already exists";

      if (existingUser.Email === Email) {
        message += " with email " + existingUser.Email;
      }

      return res.status(400).json({
        success: false,
        message: message,
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ Email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || userOTP !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const userData = await User.create({
      name,
      password,
      phone,
      Email,
      fullName,
      postalCode,
      city,
      address,
      country,
    });

    const token = createToken(userData);

    res.status(200).json({
      status: "success",
      token,
      data: { user: userData },
    });
  } catch (err) {
    res.status(400).json({
      data: { error: err },
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(403).json({
        status: "fail",
        message: "You need to login to access!",
      });
    }

    const token = authorization.split(" ")[1];

    const decodedData = verifyToken(token);

    if (!decodedData) {
      return res.status(403).json({
        status: "fail",
        message: "You need to login to access!",
      });
    }

    const userData = await User.findById(decodedData.id);

    if (!userData) {
      return res.status(403).json({
        status: "fail",
        message: "You need to login to access!",
      });
    }

    req.user = userData;

    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to access!",
      });
    }

    next();
  };
};
