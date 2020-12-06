module.exports.ValidationError = function (message) {
  this.message = message;
  this.name = "ValidationError";
};

module.exports.AuthenticationError = function (message) {
  this.message = message;
  this.name = "AuthenticationError";
};
