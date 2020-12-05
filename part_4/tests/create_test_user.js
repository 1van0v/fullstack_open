module.exports = function (index = 1) {
  return {
    username: `username_${index}`,
    name: `name_${index}`,
    password: `password_${index}`,
  };
};
