import {Injectable} from '@angular/core';
import {PilaService} from './Pila.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerPilaService {

  public pila:PilaService;

  constructor() {
  }

  public validarExpresion(valor) {
    this.pila = new PilaService();
    let cadena = valor;

    for (let i = 0; i <= cadena.length; i++) {

      if (cadena.charAt(i) == '(' || cadena.charAt(i) == '[' || cadena.charAt(i) == '{') {

          this.pila.insertar(cadena.charAt(i));

      } else {

        if (cadena.charAt(i) == ')') {

          if (this.pila.extraer() != '(') {
            return false;
          }

        } else {
          if (cadena.charAt(i) == ']') {

            if (this.pila.extraer() != '[') {
              return false;
            }

          } else {
            if (cadena.charAt(i) == '}') {

              if (this.pila.extraer() != '{') {
                return false;
              }

            }
          }
        }
      }

    }
    return this.pila.PilaVacia();
  }


}
