const mongoose = require("mongoose");
const modelToJSON = require("../utils/model_to_json");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform(document, returnObj) {
    modelToJSON.transform(document, returnObj);
    delete returnObj.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
