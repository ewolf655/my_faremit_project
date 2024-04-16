const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "500kb", extended: true }));
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.use(express.static("public"));

const countryRoutes = require("./routes/countries");
const userRouter = require("./routes/users");
const creditRouter = require("./routes/FortressApi");
const recipientRouter = require("./routes/Recipient");
const otpRouter = require("./routes/otpRoutes");
const KadoRouter = require("./routes/Kado");

app.use("/api/auth/send-otp", otpRouter);
app.use("/api/auth", userRouter);
app.use("/api", creditRouter);
app.use("/api/kado", KadoRouter);
app.use("/api", countryRoutes);
app.use("/api/recipient", recipientRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});

module.exports = app;
