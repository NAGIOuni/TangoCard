const Joi = require("joi");

module.exports.userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
  age: Joi.number().required().min(0).max(200),
});
