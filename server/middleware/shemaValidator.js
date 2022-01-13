const { celebrate } = require("celebrate");

const validator = (schema) => celebrate(schema, { abortEarly: false });

module.exports = validator;
