const express = require('express')
const router = express.Router()
const UsersService = require('./../services/user.service')


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



module.exports = router
