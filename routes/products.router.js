const express = require('express')
const router = express.Router()
const ProductsService = require('./../services/product.service')
const validatorHandler = require('./../middlewares/validator.handler') //validation middleware always should run on routes
const {createProductSchema, getProductSchema, queryProductSchema, updateProductSchema} = require('./../schemas/product.schema')


const service = new ProductsService()

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);


 router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
   async (req,res, next) => {
  try {
    const { id } = req.params
    const product = await service.findOne(id)
    res.json(product)
   } catch (error) {
    next(error)
  }
 })

 router.post('/',
 validatorHandler(createProductSchema, 'body'),
 async (req, res, next) => {
   try {
     const body = req.body;
     const newProduct = await service.create(body);
     res.status(201).json(newProduct);
   } catch (error) {
     next(error);
   }
 }
);


 router.patch('/:id', validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
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
