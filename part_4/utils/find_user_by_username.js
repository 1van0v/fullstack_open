const user = require("../models/user");

module.exports.findUserByUsername = async (username) => {
  const queryResult = await user.findOne({ username }).exec();
  return queryResult || {};
};
