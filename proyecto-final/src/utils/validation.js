const Joi = require('joi');

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'El nombre es obligatorio',
      'string.base': 'El nombre debe ser una cadena de texto'
    }),
    description: Joi.string().allow('').messages({
      'string.base': 'La descripción debe ser una cadena de texto'
    }),
    price: Joi.number().positive().required().messages({
      'any.required': 'El precio es obligatorio',
      'number.base': 'El precio debe ser un número',
      'number.positive': 'El precio debe ser un número positivo'
    }),
    stock: Joi.number().integer().min(0).required().messages({
      'any.required': 'El stock es obligatorio',
      'number.base': 'El stock debe ser un número',
      'number.integer': 'El stock debe ser un número entero',
      'number.min': 'El stock no puede ser negativo'
    }),
    category: Joi.string().allow('').messages({
      'string.base': 'La categoría debe ser una cadena de texto'
    })
  });
  return schema.validate(product);
};

const validateCart = (cart) => {
  const schema = Joi.object({
    products: Joi.array().items(
      Joi.object({
        productId: Joi.string().required().messages({
          'any.required': 'El ID del producto es obligatorio',
          'string.base': 'El ID del producto debe ser una cadena de texto'
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          'any.required': 'La cantidad es obligatoria',
          'number.base': 'La cantidad debe ser un número',
          'number.integer': 'La cantidad debe ser un número entero',
          'number.min': 'La cantidad debe ser mayor que 0'
        })
      })
    ).required().messages({
      'any.required': 'La lista de productos es obligatoria',
      'array.base': 'La lista de productos debe ser un array'
    })
  });
  return schema.validate(cart);
};

// Validaciones para otros modelos (Ticket, User, etc.)

module.exports = { validateProduct, validateCart };