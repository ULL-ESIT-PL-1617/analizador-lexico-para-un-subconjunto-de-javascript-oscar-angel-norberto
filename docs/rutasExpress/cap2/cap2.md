# **ROUTING**

Hace referencia a la dfinicion de puntos finales de aplicación y cómo responden a las solicitudes de cliente.

```.js
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});


```

## Métodos de ruta

El método de ruta se deriva de uno de los métodos HTTP y se adjunan a una instancia de express.

```.js
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

```


Expres da soporte a los métodos con los métodos HTTP.

Hay un método especial, app.all() que no deriva de ningún método HTTP. Este método se utiliza para cargar funciones de middleware en una vía de acceso para todos los métodos de solicitud.

````.js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

````


## Vías de acceso de ruta

Las vías de acceso de ruta definen los puntos finales en los que pueden realizarse las solicitudes.

Este es un ejemplo de acceso a rutas.

**Ruta raiz '/'**

```.js
app.get('/', function (req, res) { // envio a raiz
  res.send('root'); // lo que se ele envia.
});
```


## Manejadores de rutas


Puede proporcionar varias funciones de devolución de llamada que se comportan como middleware para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar next('route') para omitir el resto de las devoluciones de llamada de ruta. Puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

Los manejadores de rutas pueden tener la forma de una función, una matriz de funciones o combinaciones de ambas, como se muestra en los siguientes ejemplos.

Mas de una función de devolución de llamada puede manejar una ruta.

```.js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```



## Métodos de respuesta

Los métodos en el objeto de respuesta (res) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

| **Método** | **Descripción** |
| ------------ | ------------- |
| res.download() | solicita un archivo para descargarlo |
| res.end() | Finaliza el proceso de respuesta |
| res.josn() | Envia una respuesta JSON |
| res.jsonp() | Envía una respuesta JSON con soporte JSONP |
| res.redirect() | Redirecciona una solicitud |
| res.render() | Representa una plantilla de vista |
| res.send() | Envía una respuesta de varios tipos. |
| res.sendfile() | Envía un archivo como una secuencia de octetos |
| res.sendStatus() | Establece el código de la respuesta y envía su representación de serie como el cuerpo de respuesta |


## app.route()

Puede crear manejadores de rutas encadenables para una vía de acceso de ruta utilizando app.route(). Como la vía de acceso se especifica en una única ubicación, la creación de rutas modulares es muy útil, al igual que la reducción de redundancia y errores tipográficos. Para obtener más información sobre las rutas, consulte: Documentación de Router().

A continuación, se muestra un ejemplo de manejadores de rutas encadenados que se definen utilizando app.route().


```.js
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```


## express.Router

Utilice la clase express.Router para crear manejadores de rutas montables y modulares. Una instancia Router es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una “miniaplicación”.

El siguiente ejemplo crea un direccionador como un módulo, carga una función de middleware en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la aplicación principal.

Cree un archivo de direccionador denominado hello.js en el directorio de la aplicación, con el siguiente contenido:

```.js
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Hello home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About Hello');
});

module.exports = router;
```

A continuación, cargue el módulo de direccionador en la aplicación:

```.js
var birds = require('./birds');
...
app.use('/birds', birds);
```
