const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true, //this is the code I added that solved it all
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  console.log(process.env.ENVIRON);
 
  try {
    mongoose.connect(
      process.env.ENVIRON === "production"
        ? process.env.MONGODB_REMOTE
        : process.env.MONGODB_LOCAL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoCreate: true,
        autoIndex: true,
      },
      () =>
        console.log(
          `Connected to ${
            process.env.ENVIRON === "production"
              ? "Production DB"
              : "Development DB"
          }`
        )
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connectDB,
};
