require("dotenv").config();

const { MONGO_URI, PORT, JWT_SECRET, NODE_ENV } = process.env;

const db_url = NODE_ENV === "test" ? process.env.TEST_MONGO_URI : MONGO_URI;

module.exports = { MONGO_URI: db_url, PORT, JWT_SECRET, NODE_ENV };
