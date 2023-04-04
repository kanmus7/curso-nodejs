const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json()) //middleware para recibir informacion de tipo json

const whitelist = ['http://localhost:8080']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.get('/api', (req,res) => {
  res.send('express server')
})

routerApi(app)
/* los middlewares deben ir despues del routing */
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, ()=> {
  console.log('corriento en el puerto ' + port)
})
