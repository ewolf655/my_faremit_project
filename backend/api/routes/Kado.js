const express = require("express");
const crypto = require("crypto");
const axios = require("axios");

const router = express.Router();
const publicKey = "90586d0f-49b7-4ca6-bfec-e897159f1013"; // Replace with your actual public key
const privateKey = "YourPrivateKey"; // Replace with your actual private key

const createSignature = (method, path, timestamp, payload, privateKey) => {
  const payloadHex = crypto
    .createHash("md5")
    .update(JSON.stringify(payload))
    .digest("hex");
  const toSign = method + timestamp + path + payloadHex;
  return crypto.createHmac("sha256", privateKey).update(toSign).digest("hex");
};

router.post("/send-kyc", async (req, res) => {
  const timestamp = new Date().getTime().toString();
  const path = "/v1/partner/kyc/submit"; // Path for KYC submission
  const method = "POST";
  const payload = req.body; // Payload from your Express app

  const signature = createSignature(
    method,
    path,
    timestamp,
    payload,
    privateKey
  );

  try {
    const response = await axios.post(
      "https://api.kado.money/v1/partner/kyc/submit",
      payload,
      {
        headers: {
          "X-Timestamp": timestamp,
          "X-Public-Key": publicKey,
          "X-Signature": signature,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
