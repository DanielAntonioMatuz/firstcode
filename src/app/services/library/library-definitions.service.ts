import {Injectable} from '@angular/core';
import {LibrarySymbolsService} from './library-symbols.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryDefinitionsService {

  constructor(
    private _librarySymbols: LibrarySymbolsService
  ) {
  }

  /*

  [0] = Definicion

  [1] = Traduccion

   */

  regresarDefincion(cadena, valor1?, valor2?, tam?, tipo?, otro?, valor3?, valor4?, valor5?,traduccion?) {
    let dataArgs = []
    let txt = '';
    let txt2 = '';

    switch (cadena) {
      case 'BODY':
        dataArgs[0] = 'Haz declarado una clase body, esta clase es la principal de todo el sistema, sin esta, el lenguaje no puede entender lo que ' +
          'estas escribiendo, por lo que siempre es muy' +
          ' importante declarar al principio, sino la declaras, nunca funcionara y marcara errores, toda la logica que desees escribir, ' +
          'deberá ir dentro de esta.'

        dataArgs[1] = '';

        return dataArgs

      case 'IF':
        dataArgs[0] = 'Un if se utiliza para evaluar una expresión condicional: si se cumple la condición (es verdadera), ejecutará ' +
          'un bloque de código. Si es falsa, es posible ejecutar otras sentencias. '

        dataArgs[1] = 'Haz declarado un if donde la variable 1 con nombre: ' + valor1
          + ' esta comparando con la variable 2 con nombre de: ' + valor2 + ' el tipo de condicion que se necesita para que ' +
          'cumpla la condicion, es: ' + this._librarySymbols.regresarDefincion(tipo);

        return dataArgs

      case 'VARI':

        if (tipo == 'int') {
          txt = ' Recuerda, tu variable solo permite ingresar valores enteros, es decir, numeros sin decimales y tampoco negativos, no ' +
            'debe llevar comillas para asignar el valor'
        }

        if (tipo == 'args') {
          txt = ' Recuerda, tu variable permite practicamente recibir cualquier valor, ya sea texto o numerico, debe llevar comillas (") ' +
            'al asignar el valor a la variable'
        }

        if (tipo == 'char') {
          txt = ' Recuerda, tu variable solo permite el ingreso de un valor textual, debe llevar comillas (") al asignar el valor a tu variable'
        }

        dataArgs[0] = 'En programación, una variable está formada por un espacio en el sistema de almacenaje y un nombre simbólico que está ' +
          'asociado a dicho espacio. Ese espacio contiene una cantidad de información conocida o desconocida, es decir un valor, dependiendo ' +
          'de su tipo de dato, sera el valor que permita la variable recibir como informacion' ;

        dataArgs[1] = 'Haz declarado una variable inicializada de tipo ('+ tipo +'), el nombre de tu variable es: ' + valor1 + ' y el valor asignado' +
          ' a la variable es: ' + valor2 + '. ' + txt;


        return dataArgs;

      case 'VARN':

        if (tipo == 'int') {
          txt = ' Recuerda, tu variable solo permite ingresar valores enteros, es decir, numeros sin decimales y tampoco negativos, no ' +
            'debe llevar comillas para asignar el valor'
        }

        if (tipo == 'args') {
          txt = ' Recuerda, tu variable permite practicamente recibir cualquier valor, ya sea texto o numerico, debe llevar comillas (") ' +
            'al asignar el valor a la variable'
        }

        if (tipo == 'char') {
          txt = ' Recuerda, tu variable solo permite el ingreso de un valor textual, debe llevar comillas (") al asignar el valor a tu variable'
        }

        dataArgs[0] = 'En programación, una variable está formada por un espacio en el sistema de almacenaje y un nombre simbólico que está ' +
          'asociado a dicho espacio. Ese espacio contiene una cantidad de información conocida o desconocida, a diferencia de una variable inicializada,' +
          ' esta variable unicamente esta declarada, pero no recibe ningun valor inicial, esto es util cuando se desea recibir un valor despues, en alguna ' +
          'operacion o logica posterior, que no requiere de un argumento inicial' ;

        dataArgs[1] = 'Haz declarado una variable sin inicializar de tipo ('+ tipo +'), el nombre de tu variable es: ' + valor1 + ' y ' +
          'no dispone de un valor inicial' + '. ' + txt ;

        return dataArgs;

      case 'DVW':

        if (valor1.charAt(0) == '"') {
          txt = 'proviene de un texto que haz declarado con comillas (") dentro de la misma funcion como argumento'
        } else {
          txt = 'proviene de una variable que haz declarado anteriormente'
          valor1 = ' Dependiendo del valor asignado en la variable: ' + valor1
        }

        dataArgs[0] = 'El DisplayView, es una funcion cuyo objetivo, es imprimir valores en consola, estos valores pueden provenir de una variable ' +
          'o bien, de un texto. Es muy comun utilizarlo, tanto en este lenguaje como en practicamente cualquier otro (con su respectiva sintaxis),' +
          ' puedes declarar tu primer Hola mundo con ello.' ;

        dataArgs[1] = 'Haz declarado una funcion displayView(), el valor que imprimiria ' + txt + ', su valor seria: ' + valor1 ;


        return dataArgs;

      case 'MULT':

        if (valor1.charAt(0) == 1 || valor1.charAt(0) == 2 || valor1.charAt(0) == 3 || valor1.charAt(0) == 4 || valor1.charAt(0) == 5 || valor1.charAt(0) == 6 || valor1.charAt(0) == 7 || valor1.charAt(0) == 8 || valor1.charAt(0) == 9 || valor1.charAt(0) == 0) {
          txt = 'proviene de un valor numerico que haz declarado dentro de la misma funcion como argumento, la cual es: ' + valor1
        } else {
          txt = 'proviene de una variable que haz declarado anteriormente'
          valor1 = ' Dependiendo del valor asignado en la variable: ' + valor1
        }

        if (valor2.charAt(0) == 1 || valor2.charAt(0) == 2 || valor2.charAt(0) == 3 || valor2.charAt(0) == 4 || valor2.charAt(0) == 5 || valor2.charAt(0) == 6 || valor2.charAt(0) == 7 || valor2.charAt(0) == 8 || valor2.charAt(0) == 9 || valor2.charAt(0) == 0) {
          txt2 = 'proviene de un valor numerico que haz declarado dentro de la misma funcion como argumento, la cual es: ' + valor2
        } else {
          txt2 = 'proviene de una variable que haz declarado anteriormente.'
          valor2 = ' Dependiendo del valor asignado en la variable: ' + valor2
        }

        dataArgs[0] = 'La funcion MULT, te permite hacer operaciones de multiplicacion de dos valores numericos de tipo entero (int) de ' +
          'forma sencilla.' ;

        dataArgs[1] = 'Haz declarado una funcion de tipo MULT, la variable: ' + otro + ' recibira el resultado de la multiplicacion entre los ' +
          ' valores proporcionados, las cuales, el primer valor ' + txt + ', el segundo argumento, ' + txt2 ;


        return dataArgs;

      case 'DSPE':

        dataArgs[0] = 'La funcion DisplayEnter, te permite capturar valores en consola, este valor se almacenara en una variable que tu hayas ' +
          'asignado, el valor recibido debera ser del mismo tipo de la variable que haz declarado, en caso contrario, dara error.' ;

        dataArgs[1] = 'Haz declarado una funcion displayEnter(), el valor capturado en consola, se almacenara en la variable que haz asignado, ' +
          'la cual es, la variable: ' + valor1 ;


        return dataArgs;

      case 'REST':

        if (valor1.charAt(0) == 1 || valor1.charAt(0) == 2 || valor1.charAt(0) == 3 || valor1.charAt(0) == 4 || valor1.charAt(0) == 5 || valor1.charAt(0) == 6 || valor1.charAt(0) == 7 || valor1.charAt(0) == 8 || valor1.charAt(0) == 9 || valor1.charAt(0) == 0) {
          txt = 'proviene de un valor numerico que haz declarado dentro de la misma funcion como argumento, la cual es: ' + valor1
        } else {
          txt = 'proviene de una variable que haz declarado anteriormente'
          valor1 = ' Dependiendo del valor asignado en la variable: ' + valor1
        }

        if (valor2.charAt(0) == 1 || valor2.charAt(0) == 2 || valor2.charAt(0) == 3 || valor2.charAt(0) == 4 || valor2.charAt(0) == 5 || valor2.charAt(0) == 6 || valor2.charAt(0) == 7 || valor2.charAt(0) == 8 || valor2.charAt(0) == 9 || valor2.charAt(0) == 0) {
          txt2 = 'proviene de un valor numerico que haz declarado dentro de la misma funcion como argumento, la cual es: ' + valor2
        } else {
          txt2 = 'proviene de una variable que haz declarado anteriormente.'
          valor2 = ' Dependiendo del valor asignado en la variable: ' + valor2
        }

        dataArgs[0] = 'La funcion REST, te permite hacer operaciones de resta de dos valores numericos de tipo entero (int) de ' +
          'forma sencilla.' ;

        dataArgs[1] = 'Haz declarado una funcion de tipo REST, la variable: ' + otro + ' recibira el resultado de la resta entre los ' +
          ' valores proporcionados, las cuales, el primer valor ' + txt + ', el segundo argumento, ' + txt2;


        return dataArgs;

      case 'SUM':

        if (valor1.charAt(0) == 1 || valor1.charAt(0) == 2 || valor1.charAt(0) == 3 || valor1.charAt(0) == 4 || valor1.charAt(0) == 5 || valor1.charAt(0) == 6 || valor1.charAt(0) == 7 || valor1.charAt(0) == 8 || valor1.charAt(0) == 9 || valor1.charAt(0) == 0) {
          txt = 'proviene de un valor numerico que haz declarado dentro de la misma funcion como argumento, la cual es: ' + valor1
        } else {
          txt = 'proviene de una variable que haz declarado anteriormente'
          valor1 = ' Dependiendo del valor asignado en la variable: ' + valor1
        }

        if (valor2.charAt(0) == 1 || valor2.charAt(0) == 2 || valor2.charAt(0) == 3 || valor2.charAt(0) == 4 || valor2.charAt(0) == 5 || valor2.charAt(0) == 6 || valor2.charAt(0) == 7 || valor2.charAt(0) == 8 || valor2.charAt(0) == 9 || valor2.charAt(0) == 0) {
          txt2 = 'proviene de un valor numerico que haz declarado dentro de la misma funcion como argumento, la cual es: ' + valor2
        } else {
          txt2 = 'proviene de una variable que haz declarado anteriormente.'
          valor2 = ' Dependiendo del valor asignado en la variable: ' + valor2
        }

        dataArgs[0] = 'La funcion SUM, te permite hacer operaciones de suma de dos valores numericos de tipo entero (int) de ' +
          'forma sencilla.' ;

        dataArgs[1] = 'Haz declarado una funcion de tipo SUM, la variable: ' + otro + ' recibira el resultado de la suma entre los ' +
          ' valores proporcionados, las cuales, el primer valor ' + txt + ', el segundo argumento, ' + txt2;


        return dataArgs;

      case 'FOR':

        dataArgs[0] = 'El bucle for es una estructura de control en programación en la que se puede indicar de antemano el número máximo' +
          ' de iteraciones, muy util para iterar la informacion de un arreglo u otras operaciones que requieren secuencias repetitivas' ;

        dataArgs[1] = 'Tu ciclo FOR, se inicializa con valor: ' + valor2 + ' la cual esta asignado en la variable: ' + valor1 + ', la variable ' +
          ': ' + valor4 + ' indica que gracias al tipo de condicion que es: ' + this._librarySymbols.regresarDefincion(tipo) + ' ('+ tipo + ')'
          + ', debera cumplir esta condicion hasta llegar al valor: ' +
         valor3 + ', es decir, tu ciclo FOR, realizara ' + valor3 + ' iteraciones continuas. La variable: ' + valor1 + ' tiene la propiedad de: ' + this._librarySymbols.regresarDefincion(valor5) + ' (' + valor5 + ')'


        return dataArgs;
    }
  }

}
