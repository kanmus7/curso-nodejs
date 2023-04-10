const express = require('express')
const router = express.Router()
const UsersService = require('./../services/user.service')
const validatorHandler = require('./../middlewares/validator.handler')
const schema = require('./../schemas/user.schema')

const service = new UsersService()

 //QUERYPARAMS users?limit=10&offset=200
 router.get('/', async (req,res, next)=> {
  try {
     const user = await service.find()
     res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id',validatorHandler(schema.getUserSchema, 'params')  , async (req,res, next)=> {
  try {
    const { id } = req.params
    const user = await service.findOne(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(schema.createUserSchema, 'body') ,
async (req, res, next)=>{
  try {
    const body = req.body
    const newCategory = await service.create(body)
    res.status(201).json(newCategory)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(schema.getUserSchema, 'params'),
validatorHandler(schema.updateUserSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params
    const changes = req.body
    updatedUser = await service.update(id,changes)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async(req,res, next) => {
  try {
    const { id } = req.params
    const deletedUser = await service.delete(id)
    res.json(deletedUser)
   } catch (error) {
    next(error)
  }
})

module.exports = router
