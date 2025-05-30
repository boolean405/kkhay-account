const bcrypt = require("bcryptjs");

const Encoder = {
  hash: (password) => bcrypt.hashSync(password, 10),
  compare: (plain, hash) => bcrypt.compareSync(plain, hash),
};

module.exports = Encoder;
