const dotenv = require("dotenv");
const { app } = require("./app");
const port = process.env.port || 4000;
const dbServer = require("./connections/dbConnection");

dotenv.config();  //loading envinronment variables
dbServer.connectDB(); //connecting to database


app.listen(port, () => {
  console.log(`Listening on Port ${port}: EMS Backend Service is running`);
});