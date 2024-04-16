const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username must be at most 30 characters"],
  },
  fullName: {
    type: String,
  },

  verificationStatus: { type: Boolean, default: false },
  identityId: {
    type: String,
    default: "",
  },
  country: {
    value: {
      type: String,
      // required: [true, "Country value is required"],
    },
    label: {
      type: String,
      // required: [true, "Country label is required"],
    },
  },
  Email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Make Email field unique
    lowercase: true, // Ensure emails are stored in lowercase
  },
  postalCode: {
    type: String,
    // required: [true, "postalCode is required"],
  },
  address: {
    type: String,
    // required: [true, "address is required"],
  },
  city: {
    type: String,
    // required: [true, "city is required"],
  },
  phone: {
    type: String,
    // required: [true, "Phone is required"],
    unique: true, // Make phone field unique
    lowercase: true, // Ensure emails are stored in lowercase
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },

  recipients: [
    {
      firstName: {
        type: String,
        required: [true, "Recipient name is required"],
      },
      city: {
        type: String,
        required: [true, "Recipient email is required"],
      },
      phoneNumber: {
        type: String,
        required: [true, "Recipient phone is required"],
      },
      selectedCountry: {
        type: String,
        required: [true, "Recipient phone is required"],
      },
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(this.password, 10);

  this.password = hashedPassword;

  next();
});

UserSchema.methods.checkPassword = async function (
  currentPassword,
  originalPassword
) {
  return await bcrypt.compare(currentPassword, originalPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
