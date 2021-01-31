import { Injectable } from '@angular/core';
import {LibraryWordReservedService} from './library/library-word-reserved.service';

@Injectable({
  providedIn: 'root'
})

export class CoreCompilerService {

  constructor(
    private _libraryWord: LibraryWordReservedService
  ) { }

  // Seccion del Lexico (Componente lexico):


}
