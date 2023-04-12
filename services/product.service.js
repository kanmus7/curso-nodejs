//El servicio es quien al final debe tener toda la logica de negocio
const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const pool = require('./../libs/postgres.pool')
const { models } = require('./../libs/sequelize')


class ProductsService {

  constructor(){
  }

  async create(data){
    const newProduct = await models.Product.create(data)
    return newProduct
  }

   async find(){
   const products = await models.Product.findAll({
    include: ['category']
   })
   return products
  }

  async findOne(id){
    const product =  await models.Product.findByPk(id, {
      include: ['category']
    })
    if(!product){
      throw boom.notFound('product not found');
    }
      return product
  }

  async update(id, changes){
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return { rta: true };
  }

}

module.exports = ProductsService
