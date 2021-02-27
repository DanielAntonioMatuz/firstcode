import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodoService {
  public informacion;
  siguiente: NodoService;
}
