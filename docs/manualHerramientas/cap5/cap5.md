#Pandoc

Pandoc es una herramienta multiusos que sirve para convertir documentos entre una serie de distintos formatos. En este caso, lo usamos para hacer la conversión MarkDown -> HTML.

![pandoc screenshot](/manualHerramientas/assets/pandoc.png)

##Instalación

Para instalar Pandoc en linux simplemente hay que ejecutar el comando
    sudo apt-get install pandoc

##Utilización

Una vez instalado, realizamos la conversión de un formato a otro utilizando el comando `pandoc`.
De forma estandar, Pandoc recibe la entrada de stdin y la salida la expulsa por stdout. Podemos especificar un fichero de entradad como parámetro. La entrada puede ser una url, en cuyo caso Pandoc buscará el fichero utilizando el protocolo HTTP.
    pandoc hola.md
    pandoc http://miweb.com/hola.md

Para especificar un fichero de salida tenemos que usar la opción `-o`
    pandoc -o adios.html hola.md

 Pandoc, por norma general, no produce ficheros completos correctamente cerrados y encabezados, si no fragmentos de código. Para que la salida sea un fichero completo hemos de utilizar la opción `-s/--standalone`.
    pandoc -s -o adios.html hola.md

Para especificar el formato de entrada o de salida se emplean las opciones `-r/--read` o `-f/--from` y `-w/--write` o `-t/--to` respectivamente.
    pandoc -f markdown -t html -s -o adios.html hola.md
