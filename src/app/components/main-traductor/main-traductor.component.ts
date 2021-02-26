import { Component, OnInit } from '@angular/core';
import {LibraryWordReservedService} from '../../services/library/library-word-reserved.service';

@Component({
  selector: 'app-main-traductor',
  templateUrl: './main-traductor.component.html',
  styleUrls: ['./main-traductor.component.scss']
})
export class MainTraductorComponent implements OnInit {

  public dataFunctionsDefinitions = [];
  public funcionesUpwind = [];
  public tipoDatoUpwind = [];
  public funcionESUpwind = [];
  public estructurasControlUpwind = [];

  constructor(
    private _definitionsService: LibraryWordReservedService
  ) {
    this.funcionesUpwind = ['case', 'try', 'final', 'run', 'sum', 'mult', 'rest', 'body'];
    this.tipoDatoUpwind = ['args', 'string', 'char', 'boolean', 'int', 'float'];
    this.funcionESUpwind = ['displayView', 'displayEnter'];
    this.estructurasControlUpwind = ['for', 'if']
  }

  ngOnInit(): void {

  }

}
