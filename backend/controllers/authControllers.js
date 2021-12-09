const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ASM = require("../models/ASM");
require("dotenv").config();
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
//handle errors
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

const maxAge = 3 * 24 * 60 * 60; //secon

const createToken = (id) => {
  const key = process.env.jwt_key;
  return jwt.sign({ id }, key, {
    expiresIn: maxAge,
  });
};

verifyToken = async (token) => {
  const key = process.env.jwt_key;
  return jwt.verify(token, key);
};

module.exports.signup_get = (req, res) => {
  //res.render ('signup');
  res.json("good");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      active: false,
      role: 1,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, role: user.role });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.asm_post = async (req, res) => {
  const {
    full_name,
    nick_name,
    gender,
    blood_type,
    birth_date,
    mother_name,
    father_name,
    mother_cp,
    father_cp,
    school,
    address,
    hobby,
    class_sm,
    school_grade,
    image,
  } = req.body;
  try {
    const asm = await ASM.create({
      full_name,
      nick_name,
      gender,
      blood_type,
      birth_date,
      mother_name,
      father_name,
      mother_cp,
      father_cp,
      school,
      address,
      hobby,
      class_sm,
      school_grade,
      image,
    });

    res.status(201).json({ asm: asm._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.asm_get = async (req, res, next) => {
  const field = {
    _id: 1,
    full_name: 1,
    nick_name: 1,
    birth_date: 1,
    class_sm: 1,
    image: 1,
  };
  console.log(req.cookies.jwt);
  //const auth = await verifyToken(req.cookies.jwt);
  //const token = req.cookies.jwt;
  // console.log(auth);
  // if (auth.id !== null) {
  try {
    await ASM.find({}, field).exec(function (err, result) {
      if (err) throw err;
      res.status(201).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
  // } else {
  //   res.status(401).json({ token: "fail token" });
  // }
};

module.exports.asm_get_id = async (req, res) => {
  console.log("Request Id:", req.params.id);
  try {
    await ASM.find({ _id: req.params.id }).exec(function (err, result) {
      if (err) throw err;
      res.status(201).json(result);
      //console.log(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports.asm_edit = async (req, res) => {
  const filter = { _id: req.params.id };
  const update = {
    $set: {
      full_name: req.body.full_name,
      nick_name: req.body.nick_name,
      gender: req.body.gender,
      blood_type: req.body.blood_type,
      birth_date: req.body.birth_date,
      mother_name: req.body.mother_name,
      father_name: req.body.father_name,
      mother_cp: req.body.mother_cp,
      father_cp: req.body.father_cp,
      school: req.body.school,
      address: req.body.address,
      hobby: req.body.hobby,
      class_sm: req.body.class_sm,
      school_grade: req.body.school_grade,
      image: req.body.image,
    },
  };
  const options = { upsert: false };
  try {
    const result = await ASM.updateOne(filter, update, options);
    res.status(201).json({ result });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
