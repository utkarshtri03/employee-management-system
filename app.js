const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const logger = require("morgan");
const { AppError } = require("./util/appError");
const rfs = require("rotating-file-stream");
const globalErrorHandler = require("./handlers/global-error-controller");
const { defaultUrl } = require("./urls");

// Routes
const EmployeeRoute = require("./routes/employee");

// Subscribing to unhandledRejections
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log(err.name, err.message);
  console.log("Unhandled rejection: 🔥💥 Shutting down");
  process.exit(1);
});

const app = express();

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

// Middlewares
app.set("strict routing", true);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(
  logger(
    ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms USER_AGENT: :user-agent TOTAL_TIME: :total-time ms    DATE: :date",
    { stream: accessLogStream }
  )
);


// ------------------ENDPOINTS--------------------------------------------------------------------------------------------------------------------------------------------------
app.use(`${defaultUrl}`, EmployeeRoute);
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Global error handling middleware
 */
// app.use("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

app.use(globalErrorHandler);

module.exports = { app };