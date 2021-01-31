import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryWordReservedService {

  constructor() { }

  validarPalabra(cadena) {
    return cadena === ("args") || cadena === ("body") || cadena === ("case") || cadena === ("catch") ||
      cadena === ("char") || cadena === ("displayEnter") || cadena === ("displayView") ||
      cadena === ("else") || cadena === ("final") || cadena === ("float") ||  cadena === ("for") ||
      cadena === ("if") || cadena === ("mult") || cadena === ("rest") || cadena === ("run") ||
      cadena === ("string") || cadena === ("sum") || cadena === ("try") || cadena === ("int") ||
      cadena === ("boolean");
  }

  regresarSignificado(cadena) {
  switch (cadena) {
  case "args":
  case "string":
  case "char":
  case "boolean":
  case "int":
  case "float":
    return "Tipo de dato";
  case "body":
    return "Funcion principal";
  case "case":
  case "displayEnter":
  case "displayView":
  case "else":
    return "Funcion";
  case "if":
  case "for":
    return "Estructura de control";
  case "run":
    return "Función";
  case "sum":
  case "mult":
  case "rest":
    return "Función matemática";
  case "try":
  case "catch":
    return "Funcion";
  case "final":
    return "Función";
  default:
    return cadena;
  }
}


/*** Seccion de librerias de definiciones de C++**/

validarPalabraCPlus(cadena) {
  return cadena === ("#include<iostream>") || cadena === ("#include<cstring>") || cadena === ("using namespace std;") || cadena === ("cout") ||
    cadena === ("char") || cadena === ("int") || cadena === ("float") ||
    cadena === ("string") || cadena === ("for") || cadena === ("if") ||  cadena === ("cin") ||
    cadena === ("printf") ||  cadena === ("boolean");
}

  regresarSignificadoCplus(cadena) {
    switch (cadena) {
      case "char":
      case "string":
      case "float":
      case "boolean":
      case "int":
        return "Tipo de dato";
      case "using namespace std;":
      case "#include<iostream>":
      case "#include<cstring>":
        return "Libreria del lenguaje";
      case "cout":
      case "cin":
      case "printf":
        return "Funcion";
      case "if":
      case "for":
        return "Estructura de control";
      default:
        return cadena;
    }
  }

  /** Seccion de libreria de definiciones de Java**/

  validarPalabraCJava(cadena) {
      return cadena === ("System") || cadena === ("out") || cadena === ("println") || cadena === ("print") ||
      cadena === ("char") || cadena === ("int") || cadena === ("float") ||
      cadena === ("String") || cadena === ("for") || cadena === ("if") ||  cadena === ("Scanner") ||
      cadena === ("System.in") ||  cadena === ("boolean") || cadena === ("import") || cadena === ("class");
  }

  regresarSignificadoJava(cadena) {
    switch (cadena) {
      case "char":
      case "String":
      case "float":
      case "boolean":
      case "int":
        return "Tipo de dato";
      case "System":
      case "out":
      case "println":
      case "print":
      case "Scanner":
      case "System.in":
        return "Funcion";
      case "import":
        return "Importación de librerias";
      case "if":
      case "for":
        return "Estructura de control";
      case "class":
        return "Estructura de clase";
      default:
        return cadena;
    }
  }

  /** Libreria de definiciones de Español **/

  validarPalabraEspañol(cadena) {
    return cadena === ("arreglo") || cadena === ("imprimir") || cadena === ("variable") || cadena === ("for") ||
      cadena === ("if") || cadena === ("tipo-dato") || cadena === ("simbolos") ||
      cadena === ("clase") || cadena === ("main") || cadena === ("importar") ||  cadena === ("funcion") ||
      cadena === ("matriz") || cadena === ("entrada de datos");
  }

  regresarSignificadoEspañoltoJava(cadena) {
    switch (cadena) {
      case "arreglo":
      case "imprimir":
      case "tipo-dato":
      case "for":
      case "if":
      case "main":
      case "simbolos":
      case "funcion":
      case "entrada de datos":
      case "matriz":
      case "clase":
      case "importar":
      case "variable":
      default:
        return cadena;
    }
  }

  regresarSignificadoEspañoltoJavaTraducido(cadena) {
    switch (cadena) {
      case "arreglo":

        let data = [];
        data[0] = "Una array o arreglo es una colección de variables del mismo tipo," +
          " a la que se hace referencia por un nombre común." +
          " En Java, los arrays pueden tener una o más dimensiones, aunque el array unidimensional es el más común. "
        + "\n" +
          "\n";

        data[1] = "class DemoArray\n" +
          "{\n" +
          "    public static void main (String[] args) \n" +
          "    {         \n" +
          "      // declara un array de enteros.\n" +
          "      int[] arr;\n" +
          "         \n" +
          "      // asignando memoria para 5 enteros.\n" +
          "      arr = new int;\n" +
          "         \n" +
          "      // inicializa el primer elemento del array\n" +
          "      arr = 10;\n" +
          "         \n" +
          "      // inicializa el segundo elemento del array\n" +
          "      arr = 20;\n" +
          "         \n" +
          "      // y así...\n" +
          "      arr = 30;\n" +
          "      arr = 40;\n" +
          "      arr = 50;\n" +
          "         \n" +
          "      // accediendo a los elementos del array\n" +
          "      for (int i = 0; i < arr.length; i++)\n" +
          "         System.out.println(\"Elemento en el índice \" + i + \n" +
          "                                      \" : \"+ arr);          \n" +
          "    }\n" +
          "}";

        return data;


      case "imprimir":
      case "tipo-dato":
      case "for":
      case "if":
      case "main":
      case "simbolos":
      case "funcion":
      case "entrada de datos":
      case "matriz":
      case "clase":
      case "importar":
      case "variable":
      default:
        return cadena;
    }
  }


}
