#Middleware

Una aplicación de Express es básicamente una serie de llamadas a funciones middleware. Estas funciones tienen acceso al request object y al response object, y pueden modificarlos a demás de realizar otras funcones, como ejecutar código o llamar a otras funciones middleware.
Para llamar a otra función middleware se llama a `next()` para pasarle el control a la siguiente función en la pila. Todas las funciones middleware han de llamar a `next()` o terminar el ciclo petición-respuesta (con un `send()` por ejemplo), si no lo hacen se quedaría la petición desatendida.

Hay distions tipos de middleware:
 - [Middleware a nivel de aplicación](#Aplication-level)
 - [Middleware a nivel de enrutamiento](#Router-level)
 - [Middleware de manejo de errores](#Error-handling)
 - [Middleware preconstruido](#Built-in)
 - [Middleware de terceros](#Third-party)

##Middleware a nivel de aplicación.
<a name="Aplication-level"></a>

Para utilizar un middleware de nivel de aplicación llamando a `app.use()` o `app.METHOD()` siendo METHOD alguno de los metodos HTTP que que es capaz de soportar, tales como GET, PUT o POST.
    var app = express()

    //una función sin una ruta se ejecuta siempre que la app reciva una petición
    app.use(function (req, res, next) {
      console.log('Time:', Date.now())
      next()
    })
    
    //esta función se ejecuta cuando /user/:id recibe una petición
    app.use('/user/:id', function(req, res, next){
      console.log('Request type:', req.method)
      next()
    })
    
    //esta solo se ejecuta cuando /user/:id recibe una petición con el método GET
    app.get('/user/:id', function(req, res, next){
    res.send('USER')
    })

Como vemos, habrá ocasiones en las que las tres funcionen se quieran ejecutar simultaneamente. Para esto se emplea en `next()`, el cual pasa el control a la siguiente función que quiera ejecutarse. También se pueden cargar multiples funciones middleware con una sola llamada:

    app.use('user/:id',function (req, res, next) {
      console.log('Request URL:', req.originalUrl)
      next()
    }, function (req, res, next) {
      res.send ('User info')
    })
    
   app.get('/user/:id', function(req, res, next) {
     res.end(req.params.id)
   })

En el ejemplo anterior, hay dos respuestas para GET, pero la segunda nunca se ejecuta, ya que la segunda función de la primera rompe el ciclo de petición-respuesta con un `send()`. Para saltanos parte de la pila de llamadas y ceder el control directamente a otra ruta se utiliza `next('route')`. Este `next('route')` sólo puede ser llamado por middleware que ha sido cargado con `app.METHOD()` o con `router.METHOD()`.

    app.get('/user/:id', function(req, res, next){
      //si la ID del usuario es 0, se pasa a la siguiente ruta
      if(req.params.id === '0') next('route')
      //en otro caso sigue en la misma ruta
      else next()
    }, function (req, res, next){
      res.render('regular')
    })
    
    //esta solo se ejecuta cuando se le pasa el control con next('route')
    app.get('/user/:id', function (req, res, next){
      res.render('special')
    }


##Middleware a nivel de enrutamiento
<a name="Router-level"></a>

El middleware a nivel de enrutamiento funciona de la misma manera que el de nivel de aplicación, excepto que es una instancia de `express.Router`. En el resto de aspectos funciona de manera similar.

    var app = express()
    var router = express.Router()

También es importante destacar que en lugar de `next('route')` se emplea `next('router')` trabajando con middleware a nivel de enrutamiento.


##Middleware de manejo de errores
<a name="Error-handling"></a>

Lo que diferencia a los middldeware de manejo de errores del resto es que se llaman con cuatro argumentos en lugar de con tres: (err, req, res, next)

    app.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Something broke!')
    })

##Middleware preconstruido
<a name = "Built-in"></a>

Express tiene una serie de módulos separados con funciones middleware preconstruidas. A pesar de eso, express incluye `express.static` que permite enviar assets estaticos tales como páginas html o imágenes.

    express.static(root, [options])

El argumento root indica el directorio raíz desde el que se cargarán los assets. Options es un argumento opcional que se puede extender mucho, para más detalle consultar (express.static)[http://expressjs.com/en/4x/api.html#express.static).
Puede haber más de un `express.static()` por app.

##Middleware de terceros
<a name= "Third-party"></a>

Puede instalarse software de terceros que incluya sus propias funciones middleware para añadirle funcionalidades a express.

    //aquí instalamos el middleware cookie-parser
    $npm install cookie-parser
    
    //y así lo utilizamos
    var express = require('express')
    var app = express()
    var cookieParser = require('cookie-parser')
    
    app.use(cookieParser())

