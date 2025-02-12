// src/utils/validation.js
const Joi = require('joi');

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
  });
  return schema.validate(product);
};

// Validaciones para otros modelos

module.exports = { validateProduct };