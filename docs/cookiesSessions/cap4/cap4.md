#Query String

###¿Que son los Query Strings?

Los Query Strings son uno de los métodos para transmitir información a través de distintas páginas web, utilizando para ello cadenas de caracters extra al final de las url. Un ejemplo puede ser una búsqueda en google:

    google.es/search?site=&source=hp&q=busqueda+de+ejemplo

El texto que a partir de `?` es el Query String propiamente dicho.

###Usos

El principal uso que tienen es el de proporcionar información adicional al destino. En el caso de que la petición sea recibida por un programa, este programa puede utilizar la información para modificar la página de forma dinámica (las páginas estáticas no suelen poder hacer esto y simplemente ignoran lo que halla a partir de la `?`).

A demás, pueden servir para proporcionar un identificador único a una sesión del usuario, permitiendo que se rastree sus movimientos a través de distintas páginas, en lo que se conoce como "Tracking". Este sistema se diferencia de las cookies en que no requiere que el cliente almacene información, ya que simplemente se guardan como códigos en el url del sitio, aunque de esta manera incluso un mismo usuario que halla accedido en dos momentos distintos, o de dos formas distinas a una página serán tratados como usuarios distintos. A difrencia de las cookies, no se pueden desactivar por lo que es más fiable utilizar este método para hacer Tracking de sesiones individuales.

###Codificación

Debido a ciertas restricciones con los carácters dentro de las url, los Query Strings han de codificarse de una manera llamada "Percent-encoding":
 + Los espacios se escriben `+` o `%20`.
 + Las carácters alfanuméricos y `*`,`-`,`.` y `_` se mantienen igual.
 + Los demás caracteres se escriben como `%HH` donde HH es la codificación en hexadecimal segun UTF-8 (normalmente).

