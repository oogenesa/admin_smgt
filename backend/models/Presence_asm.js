const mongoose = require("mongoose");

const PresenceSchema = new mongoose.Schema({
  presence_date: {
    type: Date,
    required: [true, ""],
  },
  id_asm: {
    type: String,
    required: [true, ""],
  },
  status: {
    type: String,
    required: [true, ""],
  },
  description: {
    type: String,
  },
  class_sm: {
    type: String,
    required: [true, ""],
  },
});

const Presence_asm = mongoose.model("presence_asm", PresenceSchema);

module.exports = Presence_asm;
