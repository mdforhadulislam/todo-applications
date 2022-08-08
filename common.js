const bcrypt = require("bcrypt");

const convartHash = (string) => {
  const hashString = bcrypt.hashSync(string, 3);
  return hashString;
};

const compare = (string, hashString) => {
  const value = bcrypt.compareSync(string, hashString);
  return value;
};

module.exports = {
  convartHash,
  compare,
};
