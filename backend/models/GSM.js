const mongoose = require("mongoose");

const GSMSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Silakan Masukkan Nama Lengkap"],
    unique: true,
  },
  nick_name: {
    type: String,
    required: [true, "Silakan Masukkan Nama Panggilan"],
  },
  gender: {
    type: String,
    required: [true, "Silakan Pilih Jenis Kelamin"],
  },
  blood_type: {
    type: String,
  },
  birth_date: {
    type: Date,
    required: [true, "Silakan Pilih Tanggal Lahir"],
  },
  work_place: {
    type: String,
    required: [true, "Silakan Masukkan Tempat Kerj"],
  },
  address: {
    type: String,
    required: [true, "Silakan Masukkan Alamat"],
  },
  hobby: {
    type: String,
    required: [true, "Silakan Masukkan Minat"],
  },
  class_sm: {
    type: String,
    required: [true, "Silakan Masukkan Kelas"],
  },
  school_grade: {
    type: String,
    required: [true, "Silakan Masukkan Kelas"],
  },
  image: {
    type: String,
    required: [true, "Silakan Masukkan Foto Anak"],
  },
});

// userSchema.post ('save', function (doc, next) {
//   console.log ('new user was created & saved', doc);
//   next();
// });

// userSchema.pre ('save', async function (next) {
//   const salt = await bcrypt.genSalt ();
//   this.password = await bcrypt.hash (this.password, salt);
//   next ();
// });

// userSchema.statics.login = async function (email, password) {
//   const user = await this.findOne ({email});
//   if (user) {
//     const auth = await bcrypt.compare (password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error ('incorrect password');
//   }
//   throw Error ('incorrect email');
// };

const GSM = mongoose.model("gsm", ASMSchema);

module.exports = GSM;
