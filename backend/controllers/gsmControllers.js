const jwt = require("jsonwebtoken");
const GSM = require("../models/GSM");
require("dotenv").config();
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  //incorect email
  if (err.message === "incorrect username") {
    errors.username = "that username is not registered";
  }
  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  if (err.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }
  if (err.message === "User is not active") {
    errors.username = "User is not active, please contact admin";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

verifyToken = async (token) => {
  const key = process.env.jwt_key;
  return jwt.verify(token, key);
};

module.exports.gsm_post = async (req, res) => {
  const {
    full_name,
    nick_name,
    gender,
    blood_type,
    birth_date,
    work_place,
    work_status,
    address,
    hobby,
    contact_number,
    emergency_number,
    priority_class,
    join_date,
    sermon,
    worship_leader,
    assistant,
    guitar,
    keyboard,
    cajon,
    officer,
    instagram,
    twitter,
    facebook,
    line,
    certification_level,
    image,
  } = req.body;
  const active = true;
  const input_date = Date.now();
  try {
    const gsm = await GSM.create({
      full_name,
      nick_name,
      gender,
      blood_type,
      birth_date,
      work_place,
      work_status,
      address,
      hobby,
      contact_number,
      emergency_number,
      priority_class,
      join_date,
      sermon,
      worship_leader,
      assistant,
      guitar,
      keyboard,
      cajon,
      officer,
      line,
      instagram,
      twitter,
      facebook,
      certification_level,
      image,
      input_date,
      active,
    });

    res.status(200).json({ gsm: gsm._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.gsm_edit = async (req, res) => {
  const input_date = Date.now();
  const filter = { _id: req.params.id };
  const update = {
    $set: {
      full_name: req.body.full_name,
      nick_name: req.body.nick_name,
      gender: req.body.gender,
      blood_type: req.body.blood_type,
      birth_date: req.body.birth_date,
      work_place: req.body.work_place,
      work_status: req.body.work_status,
      address: req.body.address,
      hobby: req.body.hobby,
      contact_number: req.body.contact_number,
      emergency_number: req.body.emergency_number,
      priority_class: req.body.priority_class,
      join_date: req.body.join_date,
      sermon: req.body.sermon,
      worship_leader: req.body.worship_leader,
      assistant: req.body.assistant,
      guitar: req.body.guitar,
      keyboard: req.body.keyboard,
      cajon: req.body.cajon,
      officer: req.body.officer,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      facebook: req.body.facebook,
      line: req.body.line,
      certification_level: req.body.certification_level,
      image: req.body.image,
      input_date: input_date,
    },
  };
  const options = { upsert: false };
  try {
    const result = await GSM.updateOne(filter, update, options);
    res.status(200).json({ result });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.gsm_get = async (req, res) => {
  const field = {
    _id: 1,
    full_name: 1,
    nick_name: 1,
    birth_date: 1,
    priority_class: 1,
    sermon: 1,
    worship_leader: 1,
    assistant: 1,
    guitar: 1,
    keyboard: 1,
    cajon: 1,
    image: 1,
    officer: 1,
  };
  //console.log(req.cookies.jwt);
  //const auth = await verifyToken(req.cookies.jwt);
  //const token = req.cookies.jwt;
  // console.log(auth);
  // if (auth.id !== null) {
  try {
    await GSM.find({}, field).exec(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
  // } else {
  //   res.status(401).json({ token: "fail token" });
  // }
};

module.exports.gsm_get_id = async (req, res) => {
  console.log("Request Id:", req.params.id);
  try {
    await GSM.find({ _id: req.params.id }).exec(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
      //console.log(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.gsm_get_service = async (req, res) => {
  var filter = {};
  switch (req.params.service) {
    case "sermon":
      filter = {
        sermon: true,
      };
      break;
    case "worship_leader":
      filter = {
        worship_leader: true,
      };
      break;
    case "assistant":
      filter = {
        assistant: true,
      };
      break;
    case "guitar":
      filter = {
        guitar: true,
      };
      break;
    case "keyboard":
      filter = {
        keyboard: true,
      };
      break;
    case "cajon":
      filter = {
        cajon: true,
      };
      break;
    default:
      res.status(210).json({ error: "wrong param" });
      return;
      break;
  }

  const field = {
    _id: 1,
    nick_name: 1,
  };

  try {
    await GSM.find(filter, field).exec(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
  // } else {
  //   res.status(401).json({ token: "fail token" });
  // }
};
