const mongoose = require("mongoose");

const OfficerSchema = new mongoose.Schema({
  position: {
    type: Number,
    unique: true,
    required: [true, ""],
  },
  position_name: {
    type: String,
    required: [true, ""],
  },
  officer_id: {
    type: String,
    required: [true, ""],
  },
});

const Officer = mongoose.model("officer", OfficerSchema);

module.exports = Officer;
