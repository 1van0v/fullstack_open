const mongoose = require("mongoose");
const modelToJSON = require("../utils/model_to_json");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform(document, returnObj) {
    modelToJSON.transform(document, returnObj);
    delete returnObj.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
