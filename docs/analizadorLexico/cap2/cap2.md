#RegExp en Javascript

###¿Que es un RegExp?

Un RegExp es un objeto que representa una expresión regular. Se puede utilizar como variable y tiene métodos propios.

##Metodos RegExp

####exec()

El metodo exec() requiere una cadena como parametro y devuelve un array con la subcadena que coincide con la expresión regular, o null si no hay coincidendias.

    var str = "Hola mundo";
	var patt = new RegExp("a\smundo");
	var res = patt.exec(str);

Devuelve: `a mundo`.

####test()

Comprueba si una cadena coincide con la expresión regular. Devuelve true o false.

    var str = "Hola mundo";
	var patt = new RegExp("a\smundo");
	var res = patt.test(str);

Devuelve: `true`.

####search()

Serch se ejecuta sobre una cadea y devuelve el indice en el que comienza la subcadena que coincide con la expresión regular, o -1 si no coincide.

    var str = "Hola mundo";
	var patt = new RegExp("a\smundo");
	var res = str.search(patt);
	
Devuelve: `3`.

####replace()

Este metodo devuelve un nuevo string donde ciertos patrones han sido remplazados por otros
    
	var re = new RegExp("apples", gi);
    var str = "Apples are round, and apples are juicy.";
    var newstr = str.replace(re, "oranges")
	
Devuelve: `oranges are round, and oranges are juicy.`.
