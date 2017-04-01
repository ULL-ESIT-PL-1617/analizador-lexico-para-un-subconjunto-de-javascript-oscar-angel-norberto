"use strict";

RegExp.prototype.bexec = function(str) {
  let i = this.lastIndex;
 
  let resultado = this.exec(str);
  if(resultado && (resultado.index == i)) return resultado;
  return null;
}

function Token() {
    this.from;             
    this.i = 0;               
    this.n;                    
    this.m;                   
    this.result = [];           
}

Token.prototype.tokens = function (str) {
    const WHITES              = /\s+/g;
    const ID                  = /[a-zA-Z_][a-zA-Z0-9_]*/g;
    const NUM                 = /\d+(.\d+)?([eE][+-]?\d+)?/g;
    const STRING              = /('(\\.|[^'])*')|("(\\.|[^"])*")/g;
    const ONELINECOMMENT      = /\/\/.*/g;
    const MULTIPLELINECOMMENT = /\/\*(.|\n)*?\*\//g;
    const TWOCHAROPERATORS    = /(===|!==|[+][+=]|-[-=]|=[=<>]|[<>][=<>]|&&|[|][|])/g;
    const ONECHAROPERATORS    = /([-+*\/=()&|;:,<>{}[\]?%])/g;
    const tokens = [WHITES, ID, NUM, STRING, ONELINECOMMENT, MULTIPLELINECOMMENT, TWOCHAROPERATORS, ONECHAROPERATORS ];
   
    if (!str) return; 
    
    while (this.i < str.length) {
        let i = this.i; //Necesario ya que this cambia dentro de forEach
        tokens.forEach(function(t) {
            t.lastIndex = i;
             
        }); 
       
        this.from = this.i;
     
        if (this.m = WHITES.bexec(str) || 
           (this.m = ONELINECOMMENT.bexec(str))  || 
           (this.m = MULTIPLELINECOMMENT.bexec(str))) { this.getTok();
           }
        // name.
        else if (this.m = ID.bexec(str)) {
            this.result.push(this.make('name', this.getTok()));
        } 
        // number.
        else if (this.m = NUM.bexec(str)) {
            this.n = +this.getTok();

            if (isFinite(this.n)) {
                this.result.push(this.make('number', this.n));
            } else {
                this.make('number', this.m[0]).error("Bad number");
            }
        } 
        // string
        else if (this.m = STRING.bexec(str)) {
            this.result.push(this.make('string', this.getTok().replace(/^["']|["']$/g,'')));
        } 
        // two char operator
        else if (this.m = TWOCHAROPERATORS.bexec(str)) {
            this.result.push(this.make('operator', this.getTok()));
        // single-character operator
        } else if (this.m = ONECHAROPERATORS.bexec(str)){
            this.result.push(this.make('operator', this.getTok()));
        } else {
          throw "Syntax error near '"+str.substr(this.i)+"'";
        }
    }
    return this.result;
};

Token.prototype.make = function (type, value) {
    return {
        type: type,
        value: value,
        from: this.from,
        to: this.i
    };
};

Token.prototype.getTok = function () {
    let str = this.m[0];
    this.i += str.length;
    return str;
};
