const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoriesService {

  constructor() {}

  async find() {
    const categories = await models.Category.findAll({
      include: ['products']
    })
    return categories
  }

  async findOne(id) {
   const category = await models.Category.findByPk(id, {
    include: ['products']
   })
   return category
  }

  async create(data) {
   const newCategory = await models.Category.create(data)
   return newCategory
  }

  async update(id, changes) {
   return {
    id,
    changes
   }
  }

  async delete(id) {
    return { rta: true };
  }

}

module.exports = CategoriesService;
