# **Introducción al ROUTING**

Routng se refiere a determinar cómo una aplicación responde a una solicitud de cliente a un extremo determinado, que es un URI (o path) y un método de solicitud HTTP específico (GET, POST, etc.).

 Cada ruta puede tener una o más funciones del manejador, que se ejecutan cuando la ruta se corresponde.

> app.METHOD(PATH, HANDLER)

 + Donde:
  - app es una instancia de express.
  - METHOD es un método de solicitud HTTP.
  - PATH es una vía de acceso en el servidor.
  - HANDLER es la función que se ejecuta cuando se correlaciona la ruta.

  ```.js
  var express = require('express');
  var app = express();

  app.get('/',function (req, res) {
    res.send('Hello World!');
  });
  ```
