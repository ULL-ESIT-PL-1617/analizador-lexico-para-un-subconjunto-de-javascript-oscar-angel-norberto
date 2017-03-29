#MarkDown

MarkDown es una sintaxis que permite darle un formato HTML a los documentos de forma facil e intuitiva.
MarkDown permite, entre otras cosas, crear tablas, enlaces, insertar imagenes e insertar videos. Esta sintaxis puede ser convertida a HTML utilizando otros programas como pandoc o puede interpretarse directamente.
La idea de MarkDown es ser un lenguaje que acompañe al HTML y permita de forma cómoda escribir en los sitios web. Como veremos más adelante, la sintaxis de MarkDown a penas tiene capacidad expresiva o flexibilidad en comparación a HTML o XML, sin embargo para escribir textos simples (y no tan simples) como las páginas de este libro funciona perfectamente y es mucho más intuitivo y fácil de leer que las otras opciones.

##¿Cómo se usa MarkDown?

MarkDown no tiene requisitos previos para ser utilizado, lo único que requiere es un "interprete" para converitrlo a HTML o visualizarlo directamente. Este software que interpreta MarkDown lo trataremos más adelante.
Incluso sin un software intermedio, un texto MarkDown puede leerse y entenderse facilmente.

##Sintaxis

En esta sección explicaremos en detalle las posibiliades que ofrece la sintaxis de MarkDown. Aunque uno se puede hacer una idea bastante aproximada de cómo es simplemente mirando cualquier documento escrito con MarkDown. Además dentro de un documento MarkDown se pueden utilizar etiquetas HTML que sustituyan cualquiera de las opciones aquí mostradas sin que haya ninguna diferencia en el resultado.

###Títulos

Existen 6 niveles de títulos, siendo el nivel 1 el mayor y 6 el menor. Para indica que una linea es un título se colocan delante un número de almohadillas igual al nivel del título.
#Nivel 1
    #Nivel 1
##Nivel 2
    ##Nivel 2
###Nivel 3
    ###Nivel 3
####Nivel 4
    ####Nivel 4
#####Nivel 5
    #####Nivel 5
######Nivel 6
    ######Nivel 6

Existe una sintaxis alternativa para los títulos 1 y 2 que consiste en "subrayar" la linea de debajo del título con = o - respectivamente.
Nivel 1 alternativo
===================
    Nivel 1 alternativo
    ===================
Nivel 2 alternativo
-------------------
    Nivel 2 alternativo
    -------------------

###Bloques de cita

Al igual que los correos electrónicos, se puede citar un contenido añadiendo > al principio de la linea. Con MarkDown basta con que la añadamos al principio del párrafo.

    >Esto es una cita.
    >La cita puede contener otros elementos
    >###Como encabezados

>Esto es una cita.
>La cita puede contener otros elementos
>#Como encabezados

###Listas

Para hacer listas, utilizamos * , + , o - indististintamente, separadas por espacios.
Tambien podemos usar numeros para ordenar las listas.

    * Cabeza
    * Hombros
    * Pies

    1. Cabeza
    2. Hombros
    3. Pies

* Cabeza
* Hombros
* Pies

1. Cabeza
2. Hombros
3. Pies.

###Bloques de código

Para escribir sobre programación tenemos que indentar el texto cuatro espacios. Los textos indentados no se formatean, si no que se escriben literalente.

Los ejemplos de los otros apartados están hechos de esta manera.

###Enlaces

Markdown soporta dos tipos de enlaces: inline y por referencia
En ambos casos, el texto del enlace se  escribe [entre corchetes].
Para crea un link inline, se escribe el link entre paréntesis justo detrás del texto entre corchetes.

    Esto es [un ejemplo](http://ejemplo.com/).
    También [puede estar](http://ejemplo.com/) en medio de la linea.

En los enlaces por referencia, se escribe el texto del enlace y al lado, entre corchetes, una id. Después del parrafo, se escribe la id y el enlace en cuestión. El resultado es el mismo que con los enlaces inline.

    Esto es un [ejemplo][ej1] y otro [ejmplo][ej2] y [otro más][ej3].

    [ej1]: http://ejemplo1.com/
    [ej2]: http://ejemplo2.com/
    [ej3]: http://ejemplo3.com/

###Enfasis

Para crear enfasis en una frase, palabra, o incluso en mitad de una palabra, se usan uno o dos * o _.

    *un asterisco*
    _una barra baja_
    **dos asteriscos**
    __dos barras bajas__

*un asterisco*

_una barra baja_

**dos asteriscos**

__dos barras bajas__

###Código

Para escribir un código y que MarkDown lo escriba de forma literal se escribe entre tildes. La diferencia entre esto y los bloques de código es que de esta manera podemos escribir secciones de código dentro de un parrafo.

    Usamos `print()` para escribir por pantalla.

###Imagenes

Se insertan imagenes de manera similar a los enlaces. Para indicar que estamos insertando una imagen, ponemos una exclamación ! al principio de la línea.

    ![Texto alternativo](/assets/manual.png)

![Texto alternativo](/manualHerramientas/assets/manual.png)
