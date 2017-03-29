# Router

Un router es un objeto que representa una versión simplificada de lo que es una aplicación express. Para crear un router basta con usar la siguiente sentencia:

    var router = express.Router();

## router.METODO(ruta, [callback, ...] callback)
Ahora podemos especificar las rutas que reconocera el router de forma similar a una aplicación express. En vez del método *get* podríamos utilizar otro método como *post*, o directamente podríamos capturar cualquier método con *router.all(ruta, [callback, ...] callback)*.

    router.get('/inicio', function(req, res) {
      res.send('Router Inicio');
    });
    router.get('/final', function(req, res) {
      res.send('Router Final');
    });

Para aplicar el router a nuestra aplicación express hay que usar el método *use* de express, indicando la ruta en la que queremos montar el router. En este caso estamos montando el mismo router en dos rutas diferentes.

    app.use('/viejo/home', router);
    app.use('/nuevo', router);

El resultado es poder responder a las rutas:
- /viejo/home/inicio
- /viejo/home/final
- /nuevo/inicio
- /nuevo/final

## Separación del router en una archivo
Con el objetivo de lograr una mayor modularidad en nuestro código, podemos usar los routers para agrupar rutas de nuestra aplicación y tenerlas en diferentes ficheros. Simplemente basta con crear un fichero nuevo, por ejemplo *miRouter.js*, en el cual definimos el router. Este fichero deberá tener al final la siguiente sentencia, ene l caso que hallamos llamada "router" a nuestro *Router*:

    module.exports = router

Finalmente, para poder cargar el router en nuestra aplicación express es necesario:

    var router = require('./miRouter.js');
## router.param(nombre, callback)
Son un tipo de middleware que se activan si en la ruta que se pide hay un parámetro que coincide con el nombre que espera este middleware.

El primer parámetro es el nombre del parámetro que activa el middleware.
El segundo parámetro es una función que tiene de argumentos.
- req, El objeto que contiene la petición
- res, El objeto que contiene la respuesta
- next, Para poder pasar al siguiente middleware
- Valor del parámetro
- Nombre del parámetro

En el siguiente ejemplo podemos ver un uso simple.

    //Ejemplo2.js
    var express = require('express');
    var app = express();

    //Creación de un router
    var router = express.Router();

    //Adición de una ruta reconocida por el router
    router.get('/:id', function(req, res) {
      res.send(req.params.saludo);
    });
    //Manejo de un parametro detectado(id)
    router.param('id', function (req, res, next, valor, id) {
    req.params.saludo = "Hola " + valor + "¡¡¡";
      next();
    });
    app.use('/usuario', router);

    app.set('port', (process.env.PORT || 8080));

    //Ruta raiz de la aplicacion principal
    app.get('/',function (req, res) {
      res.send('Raiz');
    });

    app.listen(app.get('port'), function() {
      console.log('En el puerto: ', app.get('port'));
    });

En esta aplicación express podemos visitar la ruta /usuario/nombre donde el nombre puede ser cualquier cosa. Al acceder a esta ruta se nos saldrá un mensaje con "Hola *nombre*"¡¡¡. Hay que destacar que aunque   *router.get('/:id'...* este antes que *router.param('id',...*, esté último se activa antes y añade el campo "saludo" al objeto de la petición y luego le cede el control al primero.

## router.route y router.use
El método *route* para router permite retornar una instancia de una ruta.

*router.route(ruta)*

El método *use* para router permite usar middleware, similarmente a una aplicación express.

*router.use([ruta], [funcion, ...] funcion)*
