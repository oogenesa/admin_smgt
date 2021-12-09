const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimun Password length is 6 character"],
  },
  active: {
    type: Boolean,
  },
  role: {
    type: Number,
  },
});

// userSchema.post ('save', function (doc, next) {
//   console.log ('new user was created & saved', doc);
//   next();
// });

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      if (user.active) {
        return user;
      }
      throw Error("User is not active");
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
