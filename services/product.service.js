//El servicio es quien al final debe tener toda la logica de negocio
const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const pool = require('./../libs/postgres.pool')
const sequelize = require('./../libs/sequelize')


class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool
    this.pool.on('error', (err)=> console.log(err))
  }

  generate(){
    const limit =  100
    for(let i = 0; i< limit; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return {
     data: newProduct,
      message: 'created'
    }
  }

   async find(){
   const query = 'SELECT * FROM tasks'
   const [data, metadata] = await sequelize.query(query)
   return data
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)
    if(!product){
      throw boom.notFound('Product not found')
    }
    if(product.isBlock){
      throw boom.conflict('Product is block')
    }
    return product
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1) {
      throw boom.notFound('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {
     ...product,
     ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)
    return 'product deleted'
  }

}

module.exports = ProductsService
