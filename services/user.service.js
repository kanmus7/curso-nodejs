const boom = require('@hapi/boom')
const pool = require('./../libs/postgres.pool')
const { models } = require('./../libs/sequelize')



class UsersService {
  constructor(){
    this.pool = pool
    this.pool.on('error', (err)=> console.log(err))
  }

  async create(data){
    return data
  }

  async find(){
    const response = await models.User.findAll()
   return response
  }

  async findOne(id){
    return { id }
  }

  async update(id, changes){
    return {
      id,
      changes
    }
  }


}

module.exports = UsersService
