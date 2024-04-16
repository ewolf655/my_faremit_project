const mongoose = require("mongoose");

const KYCSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  documentType: {
    type: String,
    enum: ["CNIC", "CARD", "License"], // Only allow these values
    required: true,
  },
  documentFront: {
    type: String, // Assuming this is a file path or URL for the front of the document
    required: true,
  },
  documentBack: {
    type: String, // Assuming this is a file path or URL for the back of the document
    
  },
  selfPortrait: {
    type: String, // Assuming this is a file path or URL for the self-portrait
  },
});

const KYC = mongoose.model("kycsubmitted", KYCSchema);

module.exports = KYC;
