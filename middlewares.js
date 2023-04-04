/* Los middlewares estan en medio del request y del response
es algo que pasa en medio de ambas acciones o procesos.

puede funcionar de manera secuancial, es decir.
podemos hacer que un middleware vaya a otro

Request -> middleware -> middleware -> response

function(req, res, next(middleware)) {
  if(something){
    res.send('end')
  } else{
    next()
  }
}

tambien hay middlewares de error, es decir, q reciben el error como 1er
parametro.

function (error, req, res, next){
  if(error){
    res.status(500).json({error})
  } else {
    next()
  }
}

CASOS DE USO:

- Funcionan como pipes
- Validad datos
- Capturar errores
- Validar permisos
- Controlar accesos
*/
