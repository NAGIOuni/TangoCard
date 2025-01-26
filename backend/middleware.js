const ExpressError = require("./utils/ExpressError");
const { userSchema } = require("./schemas");
const User = require("./models/User");
const catchAsync = require("./utils/catchAsync");

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
