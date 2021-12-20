const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: [true, ""],
  },
  name: {
    type: String,
    required: [true, ""],
  },
  logo: {
    type: String,
    required: [true, ""],
  },
  status: {
    type: String,
  },
  role: {
    type: Number,
  },
});

const Menu = mongoose.model("menu", MenuSchema);

module.exports = Menu;
