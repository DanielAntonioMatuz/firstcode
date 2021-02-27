import {Injectable} from '@angular/core';
import {NodoService} from './Nodo.service';

@Injectable({
  providedIn: 'root'
})
export class PilaService {

  private UltimoValorIngresado:NodoService;


  constructor() {
    this.UltimoValorIngresado = null;
  }

  insertar(valor) {
    let nuevo_nodo = new NodoService();
    nuevo_nodo.informacion = valor;

    if (this.UltimoValorIngresado == null) {
      nuevo_nodo.siguiente = null;
      this.UltimoValorIngresado = nuevo_nodo;
    } else {
      nuevo_nodo.siguiente = this.UltimoValorIngresado;
      this.UltimoValorIngresado = nuevo_nodo;
    }

  }

  extraer() {
    if (this.UltimoValorIngresado != null) {
      let informacion = this.UltimoValorIngresado.informacion;
      this.UltimoValorIngresado = this.UltimoValorIngresado.siguiente;

      return informacion;
    } else {
      return Number.MAX_VALUE;
    }
  }

  PilaVacia() {
    return this.UltimoValorIngresado == null;
  }



}
