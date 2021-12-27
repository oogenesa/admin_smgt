const mongoose = require("mongoose");

const PresenceSchema = new mongoose.Schema({
  presence_date: {
    type: Date,
    required: [true, ""],
  },
  id_gsm: {
    type: String,
    required: [true, ""],
  },
  service: {
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
  event: {
    type: String,
    required: [true, ""],
  },
});

const Presence_gsm = mongoose.model("presence_gsm", PresenceSchema);

module.exports = Presence_gsm;
