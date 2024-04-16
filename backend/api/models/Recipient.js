// recipientModel.js
const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
  },
  city: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must be at least 3 characters"],
    maxlength: [30, "First name must be at most 30 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name must be at least 3 characters"],
    maxlength: [30, "Last name must be at most 30 characters"],
  },
  selectedCountry: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name must be at least 3 characters"],
    maxlength: [30, "Last name must be at most 30 characters"],
  },
});

const Recipient = mongoose.model("Recipient", RecipientSchema);

module.exports = Recipient;
