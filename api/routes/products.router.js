const express = require('express')
const router = express.Router()
const ProductsService = require('./../services/product.service')
const validatorHandler = require('./../middlewares/validator.handler') //validation middleware always should run on routes
const schema = require('./../schemas/product.schema')


const service = new ProductsService()

router.get('/', async (req, res)=> {
  const products = await service.find()
  res.json(products)
 })

//Los enpoints que se tengan de manera especifica (/filter) deben ir antes
//de los que se tenga de manera dinamica

 router.get('/filter', async (req,res) => {
   res.send('yo soy un filter')
 })

 router.get('/:id', validatorHandler(schema.getProductSchema, 'params'), async (req,res, next) => {
  try {
    const { id } = req.params
    const product = await service.findOne(id)
    res.json(product)
   } catch (error) {
    next(error)
  }
 })

 router.post('/', validatorHandler(schema.createProductSchema, 'body') ,
 async (req, res)=>{
  const data = req.body
  const newProduct = await service.create(data)
  res.status(201).json(newProduct)
 })

 router.patch('/:id', validatorHandler(schema.getProductSchema, 'params'),
  validatorHandler(schema.updateProductSchema, 'body'),
 async (req, res, next)=>{ //recive el objeto de forma parcial
  try {
    const { id } = req.params
    const changes = req.body
    const updatedProduct = await service.update(id, changes)
    res.json(updatedProduct)
   } catch (error) {
    next(error)
  }
 })

 router.delete('/:id', async (req, res)=>{
  try {
    const { id } = req.params
    const deletedProduct = await service.delete(id)
    res.json(deletedProduct)

  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
 })

 module.exports = router
