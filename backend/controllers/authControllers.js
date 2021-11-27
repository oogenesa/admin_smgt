const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ASM = require("../models/ASM");

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }
  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is not registered";
  }

  if (err.code === 11000) {
    errors.email = "that email is already registered";
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
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  //res.render ('signup');
  res.json("good");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
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

module.exports.asm_get = async (req, res) => {
  const field = {
    _id: 1,
    full_name: 1,
    nick_name: 1,
    birth_date: 1,
    class_sm: 1,
    image: 1,
  };
  try {
    await ASM.find({}, field).exec(function (err, result) {
      if (err) throw err;
      res.status(201).json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
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
