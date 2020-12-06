const { PORT } = require("./utils/config");
const { app } = require("./app");

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
