const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express()
const port = 3000
app.use(express.json()) //middleware para recibir informacion de tipo json

const whitelist = ['http://localhost:8080', 'http://localhost:3001']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true)
    } else {
      callback(new Error('no permitido', false))
    }
  }
}
app.use(cors(options))
routerApi(app)
/* los middlewares deben ir despues del routing */
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)



app.listen(port, ()=> {
  console.log('corriento en el puerto ' + port)
})
