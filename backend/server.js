const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const bodyParser = require("body-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://192.168.1.205:3000", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
//app.use(express.static('public'))
app.use(express.json({ limit: "50mb" }));

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
