const Presence_asm = require("../models/Presence_asm");
const Presence_gsm = require("../models/Presence_gsm");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.asm_presence_post = async (req, res) => {
  const { presence_date, id_asm, status, description, class_sm, event } =
    req.body;
  try {
    const asm_absensi = await Presence_asm.create({
      presence_date,
      id_asm,
      status,
      description,
      class_sm,
      event,
    });

    res.status(201).json({ asm_absensi: asm_absensi._id });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.gsm_presence_post = async (req, res) => {
  const {
    presence_date,
    id_gsm,
    service,
    status,
    description,
    class_sm,
    event,
  } = req.body;
  try {
    const gsm_absensi = await Presence_gsm.create({
      presence_date,
      id_gsm,
      service,
      status,
      description,
      class_sm,
      event,
    });

    res.status(201).json({ gsm_absensi: gsm_absensi._id });
  } catch (err) {
    res.status(400).json({ err });
  }
};
