const app = require("./api/app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const compression = require("compression");
const redis = require("redis");

dotenv.config();

const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

mongoose.connect(database, {}).then(() => {
  console.log("Database connection successful");
}).catch((err) => {
  console.log(err);
});

// Enable Redis caching
const redisClient = redis.createClient();
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

// Start Server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
