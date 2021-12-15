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
  contact_number: {
    type: String,
    required: [true, "Silakan Masukkan kontak"],
  },
  priority_class: {
    type: String,
    required: [true, "Silakan Masukkan Kelas"],
  },
  join_date: {
    type: Date,
    required: [true, "Silakan Pilih Tanggal Lahir"],
  },

  sermon: {
    type: Boolean,
  },
  worship_leader: {
    type: Boolean,
  },
  assistant: {
    type: Boolean,
  },
  guitar: {
    type: Boolean,
  },
  keyboard: {
    type: Boolean,
  },
  cajon: {
    type: Boolean,
  },

  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  facebook: {
    type: String,
  },

  certification_level: {
    type: String,
    required: [true, "Silakan masukkan tahap pembinaan"],
  },
  image: {
    type: String,
    required: [true, "Silakan Masukkan Foto Guru"],
  },
  input_date: {
    type: Date,
    required: [true, ""],
  },
  active: {
    type: Boolean,
    required: [true, ""],
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

const GSM = mongoose.model("gsm", GSMSchema);

module.exports = GSM;
