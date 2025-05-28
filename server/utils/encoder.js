const bcrypt = require("bcryptjs");

const Encoder = {
  encode: (password) => bcrypt.hashSync(password, 10),
  compare: (plain, hash) => bcrypt.compareSync(plain, hash),
};

module.exports = Encoder;
