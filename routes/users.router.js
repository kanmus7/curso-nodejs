const express = require('express')
const router = express.Router()
const UsersService = require('./../services/user.service')
const service = new UsersService()

 //QUERYPARAMS users?limit=10&offset=200
 router.get('/', (req,res)=> {
 //const { limit, offset } = req.query
  const user = service.find()
  res.json(user)
})



module.exports = router
