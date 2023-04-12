const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const image = Joi.string().uri()



const getCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateCategorySchema = Joi.object({
  name : name,
  image: image
});

module.exports = { getCategorySchema, createCategorySchema, updateCategorySchema };
