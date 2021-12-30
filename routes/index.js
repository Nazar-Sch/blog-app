const { richValidationError, errorHandler } = require("../middleware/error");

module.exports = function (app) {
  app.use("/api/posts", require("./posts.route"));
  app.use("/api/user", require("./user.route"));
};
