import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibrarySymbolsService {

  constructor() {
  }

  validarSimbolo(cadena) {
    return cadena === ('.') || cadena === (',') || cadena === ('+') || cadena === ('-') ||
      cadena === (':') || cadena === (';') || cadena === ('*') ||
      cadena === ('{') || cadena === ('}') || cadena === ('(') || cadena === (')') ||
      cadena === ('[') || cadena === (']') || cadena === ('/') || cadena === ('=') ||
      cadena === ('|') || cadena === ('%') || cadena === ('>') || cadena === ('<') ||
      cadena === ('!') || cadena === ('==') || cadena === ('!=') || cadena === ('>=') ||
      cadena === ('<=') || cadena === ('||') || cadena === ('&&') || cadena === ('++') ||
      cadena === ('--');
  }

  simbolosNoPermitidos(cadena) {
    return cadena === ('#') || cadena === ('$') || cadena === ('~') || cadena === ('\\');
  }

  regresarDefincion(cadena) {
    switch (cadena) {
      case '.':
      case ',':
        return 'Simbolo';
      case '+':
        return 'Simbolo utilizado para operaciones de suma';
      case '-':
        return 'Simbolo utilizado para operaciones de resta';
      case ':':
        return 'Simbolo utilizado para separar argumentos';
      case ';':
        return 'Simbolo de terminación de línea de código';
      case '*':
        return 'Simbolo utilizado para operaciones de multiplicación';
      case '/':
        return 'Simbolo de operaciones matematicas';
      case '{':
        return 'Simbolo de agrupación (Abre función)';
      case '}':
        return 'Simbolo de agrupación (Cierra función)';
      case '(':
        return 'Simbolo de agrupación (Apertura)';
      case ')':
        return 'Simbolo de agrupación (Cierra)';
      case '[':
        return 'Simbolo de agrupación (Apertura)';
      case ']':
        return 'Simbolo de agrupación (Cierra)';
      case '"':
        return 'Simbolo de argumento String';
      case '=':
        return 'Simbolo de asignación de valor a variable';
      case '|':
        return 'Simbolo especial';
      case '%':
        return 'Simbolo especial';
      case '>':
        return 'Simbolo comparativo (mayor que)';
      case '<':
        return 'Simbolo comparativo (menor que)';
      case '>=':
        return 'Simbolo comparativo (mayor o igual)';
      case '<=':
        return 'Simbolo comparativo (menor o igual)';
      case '!':
        return 'Simbolo de negación';
      case '==':
        return 'Simbolo de comparación (igual que)';
      case '!=':
        return 'Simbolo de comparación (Diferente de)';
      case '&&':
      case '||':
        return 'Simbolo lógico';
      case '++':
      case '--':
        return 'Simbolo unario aritmetico';
      default:
        return 'No ha sido posible idetificarlo: ' + cadena;
    }
  }

}
