const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Menu = require("../models/Menu");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
//handle errors
const handleErrors = (err) => {
  let errors = { code: 400, message: "" };

  //incorect email
  if (err.message === "incorrect username") {
    errors.code = 451;
    errors.message = "that username is not registered";
  }
  //incorrect password
  if (err.message === "incorrect password") {
    errors.code = 452;
    errors.message = "that password is incorrect";
  }

  if (err.message === "User is not active") {
    errors.code = 453;
    errors.message = "User is not active, please contact admin";
    return errors;
  }
  if (err.code === 11000) {
    errors.code = err.code;
    errors.message = "that username is already registered";
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
    console.log(token)
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.cookie("role", user.role, {
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    // res.cookie("username", "Flavio", { domain: "http://192.168.1.205:3000" });
    res.status(200).json({ user: user._id, role: user.role });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(202).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("role", "", { maxAge: 1 });
  res.cookie("username", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.menu_get = async (req, res) => {
  // const { num, name, logo, active } = req.body;
  let tes = "";
  console.log(req.cookies.jwt);
  try {
    verifyToken(req.cookies.jwt).then((payload) => {
      const user = User.find({ _id: payload.id }).exec((err, result) => {
        if (err) throw err;

        tes = result[0].role;

        const menu = Menu.find({ role: { $lte: tes } }).exec((err, results) => {
          if (err) throw err;
          res.status(200).json(results);
        });
      });
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
