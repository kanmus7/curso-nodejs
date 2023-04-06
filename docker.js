/* el volumen en docker es o sonm caracteristica q permite al contenedor conservar datos */


/*


docker-compose up -d postgres -> levantar la imagen de postgre
docker-compose ps -> ver el estado de nuestro contenedor
docker-compose down -> apagar el contenedor
docker ps -> ver todo el contenedor en detalle
docker inspect (ip number de la imagen q quieras ver) -> muestra el detalle de la imagen
*/


/*
MANUPULACION DE LA BASE DE DATOS EN postgre
hay 2 maneras de hacerlo:

CONSOLA:
1. docker-compose exec postgres bash -> conectarse al contenedor via comando :
 1.1 psql -h localhost -d dbname -U username.
 1.2 \d+ -> para saber el estado de la db.
 1.3 \q -> salir de la base de datos.
 1.4: exit -> salir del contenedor.

INTERFAZ DE PGADMIN:
En nuestro archivo de docker tener lo siguiente:
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
    - 5050:80

docker-compose up -d pgadmin -> levantar la imagen de pgadmin (interfaz para manipular nuestra bd de postgre)
http://localhost:5050 -> ver el docker-compose.yml, alli esta el puerto q indicamos para abrir nuestra interfaz en el navegador

aniadir los campos para el logeo : email registrado en el archivo y password(root)

registrar/crear nuevo server
poner datos indicados...
server name/id poner en consola:
docker ps -> ver todo el contenedor en detalle
docker inspect (ip number de la imagen q quieras ver) -> muestra el detalle de la imagen
buscar el IPV4, y ponerlo.

*/
