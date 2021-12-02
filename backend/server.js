const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
//app.use(express.static('public'))
app.use(express.json({ limit: "50mb" }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
app.use(authRoutes);
app.listen(port, () => {
  console.log(`Server is runnin on port : ${port}`);
});
