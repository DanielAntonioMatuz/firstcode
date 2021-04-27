import {Component, HostListener, ViewChild} from '@angular/core';
import {LibraryWordReservedService} from './services/library/library-word-reserved.service';
import {LibrarySymbolsService} from './services/library/library-symbols.service';
import {CheckIdentificadorService} from './services/library/check-identificador.service';
import {Meta, Title} from '@angular/platform-browser';
import {stringify} from '@angular/compiler/src/util';
import {ControllerPilaService} from './services/ControllerSyn/ControllerPila.service';
import {ControllerMSService} from './services/ControllerSyn/ControllerMS.service';
import {LibraryDefinitionsService} from './services/library/library-definitions.service';
import { AfterViewInit, ElementRef, OnInit } from "@angular/core";
import { ShortcutInput, ShortcutEventOutput, KeyboardShortcutsComponent } from "ng-keyboard-shortcuts";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public inpuTerminalTraslate: string = '';
  public dataInputTraslate = '';
  public dataLexicoCorrect = '';
  public modoDev = false;
  public modoClean = false;
  public modoText = 'sin cambios';
  public dataProcessDev = [];
  public arrayColor = [];
  public valColor = -1;
  public seleccionLenguaje = 0;
  public seleccionLenguajeTraduccion = 0;
  public errorLexico = false;
  public erroresSystem = [];
  public fontSize = 20;
  public detailsInit = true;
  public predictivoUpwind = [];
  public predictivoUpwindAux = [];
  public opt1 = true;
  public opt2 = true;
  public opt3 = true;
  public opt4 = true;
  public docs = false;
  public funcionExperimental = true ;
  public count = 0;
  public groupSint = []
  public groupSintDisplay = []
  public resultAL = false;
  public sintaxisGroup = [];
  public sintaxisOpen = false;
  public bodyDeclare = false;
  public countBody = 0;
  public definitionsPanel = true;
  public synVar = [];
  public notificationKey = false;
  public countKeyPress = 0;
  public dataArgs;

  // Almacenamiento de datos prioritarios

  public arrayVar = [];


  @ViewChild('opcionLenguaje') opcionLenguaje: string;


  constructor(
    private _libraryWord: LibraryWordReservedService,
    private _librarySymbols: LibrarySymbolsService,
    public _libraryDefinitonsData: LibraryDefinitionsService,
    private _evaluationIdentificador: CheckIdentificadorService,
    private meta: Meta,
    private title: Title,
    private _AL: ControllerPilaService,
    private _CMS: ControllerMSService
  ) {

    this.arrayColor = ['#ec6a5f', '#5fecaa', '#52e69c', '#000000', '#EC5F95', '#6b52e6', '#64CC57','#485563','#fe8c00','#00c6ff','#FF6B6B'];
  }

  @HostListener('window:keydown.control.space', ['$event'])
  showPinned(event: KeyboardEvent) {
    this.inputData(this.dataArgs);
  }

  seleccionLg(value) {
    this.seleccionLenguaje = parseInt(value);
  }

  seleccionLgTraducir(value) {
    this.seleccionLenguajeTraduccion = value;
    this.notifyKey();
  }

  notifyKey() {
    this.countKeyPress++;
    if (this.countKeyPress >=2 && this.countKeyPress <= 10) {
      this.notificationKey = !this.notificationKey;
      setTimeout(()=>{                           //<<<---using ()=> syntax
        this.notificationKey = false;
      }, 5000);
    }
  }

  randomValue() {
    if (this.valColor == 5) {
      this.valColor = -1;
    }
    this.valColor++;
    return this.valColor;
  }

  docsOpen() {
    this.docs = !this.docs;
  }

  reloadTraslate() {

  }

  controllerText(value) {

    if (this.opt2) {
      if (value.length < 150) {
        var intro = document.getElementById('terminalInput');
        intro.style.fontSize = '40px';

      }

      if (value.length > 150 && value.length < 250) {
        var intro = document.getElementById('terminalInput');
        intro.style.fontSize = '30px';

      }

      if (value.length > 250) {
        var intro = document.getElementById('terminalInput');
        intro.style.fontSize = '20px';
      }
    }
  }

  buttonClean(value) {
    this.dataProcessDev = [];
    this.erroresSystem = [];
    this.inpuTerminalTraslate = '';
    this.modoText = 'sin cambios';
    this.detailsInit = true;
    this.errorLexico = false;
    this.bodyDeclare = false;
    this.sintaxisGroup = [];
  }

  selectMode(value) {
    if (value == '') {
      this.modoText = 'sin cambios';
    } else {
      this.modoText = 'limpiar';
    }
  }

  scrollAutomaticTraslate() {
    var elem = document.getElementById('data');
    elem.scrollTop = elem.scrollHeight;
  }

  predictivoSystem(value) {
    let auxData = [];
    for (let i = 0; i < value.length; i++) {
      auxData.push(this._libraryWord.predictivoUpwind(value.charAt(i)));
    }
    return auxData;
  }


  inputData(value) {
    this.dataArgs = value;
    this.selectMode(value);
    this.controllerText(value);
    this.scrollAutomaticTraslate();

    if (value != '') {
      this.detailsInit = false;
    } else {
      this.detailsInit = true;
    }


    //this.dataProcessDev = [];
    this.erroresSystem = [];
    this.sintaxisGroup = [];
    this.arrayVar = [];


    this.dataLexicoCorrect = '';
    this.dataInputTraslate = '';
    this.errorLexico = false;
    this.predictivoUpwind = [];
    this.synVar = []
    this.bodyDeclare = false;
    this.countBody = 0;

    let FirstData = value.charAt(0);

    const regex = /[^\s"']+|"[^"]*"|'[^']*'/gm;
    const str = value;
    let dataValue = null;
    let datosProcesados = [];

    let i = 0;
    while ((dataValue = regex.exec(str)) !== null) {
      if (dataValue.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      dataValue.forEach((match, groupIndex) => {
        datosProcesados[i] = match;
        i++;
      });
    }


    // Librerias de UPWIND

    if (this.seleccionLenguaje == 1) {

      for (let i = 0; i < datosProcesados.length; i++) {

        //Bloque de Analizador Léxico


        if (this._libraryWord.predictivoUpwind(datosProcesados[i]).length > 0) {
          this.predictivoUpwind = this._libraryWord.predictivoUpwind(datosProcesados[i]);
        }


        if (this._libraryWord.validarPalabra(datosProcesados[i])) {

          this.dataLexicoCorrect += datosProcesados[i] + '\n';
          this.dataInputTraslate += this._libraryWord.regresarSignificado(datosProcesados[i]) + '\n';


          this.dataProcessDev[i] = {
            'data': datosProcesados[i],
            'token': this._libraryWord.regresarSignificado(datosProcesados[i]),
            'id': 'RES'
          };


        } else if (this._librarySymbols.validarSimbolo(datosProcesados[i])) {

          this.dataLexicoCorrect += datosProcesados[i] + '\n';
          this.dataInputTraslate += this._librarySymbols.regresarDefincion(datosProcesados[i]) + '\n';

          this.dataProcessDev[i] = {
            'data': datosProcesados[i],
            'token': this._librarySymbols.regresarDefincion(datosProcesados[i]),
            'id': 'SIM'
          };

        } else if (this._librarySymbols.simbolosNoPermitidos(datosProcesados[i])) {

          this.dataInputTraslate += 'Simbolo no valido';
          this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Simbolo no valido', 'id': 'RESN'};
          //ERROR


        } else if (this._evaluationIdentificador.validarIdentificador(datosProcesados[i])) {

          if (this._evaluationIdentificador.verificadorArgumento(datosProcesados[i])) {
            let access = false;


            try {

              var valoresAceptados = /^[0-9]{1,1000}$/gm;
              //var valoresAceptados = /^[-]?[0-9]{1,1000}(?:.[0-9]{1,1000})?$/gm;
              if (datosProcesados[i].match(valoresAceptados)) {
                access = true;
              } else {
                access = false;
              }

              if (access) {

                this.dataInputTraslate += 'Numero' + '\n';
                this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Numero', 'id': 'NUM'};

              } else {

                if (datosProcesados[i].charAt(0) == '"') {
                    this.dataInputTraslate += 'Argumento' + '\n';
                    this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Argumento', 'id': 'TXT'};
                  access = true;
                } else {
                  this.dataInputTraslate += 'NO RECONOCIDO' + '\n';
                  this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'No reconocido', 'id': 'KNW'};
                  this.errorLexico = true;
                  this.erroresSystem.push({
                    'data': 'Linea: (' + (i + 1) + ')' + ' No se ha reconocido el patrón de simbolos: ' + datosProcesados[i],
                    'token': '(No reconocido), código de error: ',
                    'id': 'KNW',
                    'output:': ' en al línea: ' + i
                  });


                }


              }


              if (!access) {

                const regex = /[.]|[#]|[!]|[$]|[%]|[*]|[+]|[?]|[~]|[`]|[}]|[{]|[,]|[>]|[<]|[&]|[|]|[]]|[@]|^]|[¡]/gm;
                const str = ``;
                let m;

                while ((m = regex.exec(str)) !== null) {
                  if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                  }

                  m.forEach((match, groupIndex) => {

                    if (m.charAt(0) != '"') {
                      if (m != '++' || m != '--' || m != '&&' || m != '||') {
                        this.dataInputTraslate += 'Entrada no permitida' + '\n';
                      }
                    } else {
                      this.dataInputTraslate += 'Texto' + '\n';
                    }

                  });
                }

              } else {

              }

            } catch (e) {

            }
          } else {
            this.dataInputTraslate += 'Identificador invalido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador invalido', 'id': 'KNW'};
          }
        } else {

          if (FirstData != '"' && datosProcesados[i].charAt(0) != '_') {
            this.dataInputTraslate += 'Identificador' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador', 'id': 'IDE'};
            this.arrayVar.push(datosProcesados[i]);
          } else {
            this.dataInputTraslate += 'Error - no valido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Error - no valido', 'id': 'KNW'};
          }
        }


        // Bloque de Analizador SINTACTICO


          if (datosProcesados.length == 4) {
            this.agruparSintactico(datosProcesados);
          }


      }

      // SECCIÓN DE ANALIZADOR SINTÁCTICO

      //Bloque para analizar la sintaxis de llaves, corchetes y parentesis
      if (!this._AL.validarExpresion(value)) {
        this.erroresSystem.push({
          'data': 'Linea: (' + (i + 1) + ')' + ' Error de symbolo de cierre: ' + '( || ) || { || } || [ || ]',
          'token': 'No match Symbols ',
          'id': 'LL_KEY',
          'output:': ' en al línea: ' + i
        });
        this.errorLexico = true;
      }

      let arrayData = value.split("\n");



      for (let index = 0; index < arrayData.length; index++) {

        if (this._CMS.validarVariablesNoInicializadas(arrayData[index], this.arrayVar, this.synVar) && this.bodyDeclare) {
          this.sintaxisOpen = true;
          let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
          let data = this._libraryDefinitonsData.regresarDefincion('VARN', arrayDefinitonsData[1], '', '', arrayDefinitonsData[0], '')

          this.synVar.push(
            {
              'var': arrayDefinitonsData[1],
              'tipo': arrayDefinitonsData[0],
              'valor': '$NA'
            }
          );

          if (this.seleccionLenguajeTraduccion == 2 || this.seleccionLenguajeTraduccion == 3) {
            this.sintaxisGroup.push({
              'data': arrayData[index].replace("args", "String"),
              'token': 'VARN',
              'info': 'Variable',
              'color': '10',
              'definitions': data[0],
              'traslate': data[1]
            });
          }

          if (this.seleccionLenguajeTraduccion == 4) {
            this.sintaxisGroup.push({
              'data': arrayData[index],
              'token': 'VARN',
              'info': 'Variable',
              'color': '10',
              'definitions': data[0],
              'traslate': data[1]
            });
          }

          this.dataProcessDev = [];
        } else {
          if(this._CMS.validarVariablesInicializadas(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion) && this.bodyDeclare) {
            this.sintaxisOpen = true;
            let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
            let data = this._libraryDefinitonsData.regresarDefincion('VARI', arrayDefinitonsData[1], arrayDefinitonsData[3], '', arrayDefinitonsData[0], '')

            this.synVar.push(
              {
                'var': arrayDefinitonsData[1],
                'tipo': arrayDefinitonsData[0],
                'valor': arrayDefinitonsData[3]
              }
            );



            if (this.seleccionLenguajeTraduccion == 2 || this.seleccionLenguajeTraduccion == 3) {
              this.sintaxisGroup.push({
                'data': arrayData[index].replace("args", "String"),
                'token': 'VARI',
                'info': 'Variable inicializada',
                'color': '0',
                'definitions': data[0],
                'traslate': data[1]
              });
            }

            if (this.seleccionLenguajeTraduccion == 4) {
              this.sintaxisGroup.push({
                'data': arrayData[index],
                'token': 'VARI',
                'info': 'Variable inicializada',
                'color': '0',
                'definitions': data[0],
                'traslate': data[1]
              });
            }

            this.dataProcessDev = [];
          } else {
            if (this._CMS.validarDisplayView(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion) && this.bodyDeclare) {
              this.sintaxisOpen = true;
              let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
              let data = this._libraryDefinitonsData.regresarDefincion('DVW', arrayDefinitonsData[2], '', '', '', '')



              if (this.seleccionLenguajeTraduccion == 2) {
                this.sintaxisGroup.push({
                  'data': this._CMS.validarDisplayView(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                  'token': 'DVW',
                  'info': 'displayView()',
                  'color': '2',
                  'definitions': data[0],
                  'traslate': data[1]
                });
              }

              if (this.seleccionLenguajeTraduccion == 3) {
                this.sintaxisGroup.push({
                  'data': this._CMS.validarDisplayView(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                  'token': 'DVW',
                  'info': 'displayView()',
                  'color': '2',
                  'definitions': data[0],
                  'traslate': data[1]
                });
              }

              if (this.seleccionLenguajeTraduccion == 4) {
                this.sintaxisGroup.push({
                  'data': arrayData[index],
                  'token': 'DVW',
                  'info': 'displayView()',
                  'color': '2',
                  'definitions': data[0],
                  'traslate': data[1]
                });
              }

              this.dataProcessDev = [];
            } else {
              if (this._CMS.validarMult(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion) && this.bodyDeclare) {
                this.sintaxisOpen = true;
                let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
                let data = this._libraryDefinitonsData.regresarDefincion('MULT', arrayDefinitonsData[4], arrayDefinitonsData[6], '', '', '')



                if (this.seleccionLenguajeTraduccion == 2) {
                  this.sintaxisGroup.push({
                    'data': this._CMS.validarMult(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                    'details': 'MULT es una funcion exclusiva de UPWIND, sin embargo, una alternativa para que puedas sumar dos valores ' +
                      'en el lenguaje Java, es:',
                    'token': 'MULT',
                    'info': 'mult()',
                    'color': '4',
                    'definitions': data[0],
                    'traslate': data[1]
                  });
                }

                if (this.seleccionLenguajeTraduccion == 3) {
                  this.sintaxisGroup.push({
                    'data': this._CMS.validarMult(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                    'details': 'MULT es una funcion exclusiva de UPWIND, sin embargo, una alternativa para que puedas sumar dos valores ' +
                      'en el lenguaje Java, es:',
                    'token': 'MULT',
                    'info': 'mult()',
                    'color': '4',
                    'definitions': data[0],
                    'traslate': data[1]
                  });
                }

                if (this.seleccionLenguajeTraduccion == 4) {
                  this.sintaxisGroup.push({
                    'data': arrayData[index],
                    'token': 'MULT',
                    'info': 'mult()',
                    'color': '4',
                    'definitions': data[0],
                    'traslate': data[1]
                  });
                }

                this.dataProcessDev = [];
              } else {
                if (this._CMS.validarDisplayEnter(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion) && this.bodyDeclare) {
                  this.sintaxisOpen = true;
                  let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
                  let data = this._libraryDefinitonsData.regresarDefincion('DSPE', arrayDefinitonsData[2], '', '', '', '')



                  if (this.seleccionLenguajeTraduccion == 2) {
                    this.sintaxisGroup.push({
                      'data': this._CMS.validarDisplayEnter(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                      'token': 'DSPE',
                      'info': 'displayEnter()',
                      'color': '5',
                      'definitions': data[0],
                      'traslate': data[1]
                    });
                  }

                  if (this.seleccionLenguajeTraduccion == 3) {
                    this.sintaxisGroup.push({
                      'data': this._CMS.validarDisplayEnter(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                      'token': 'DSPE',
                      'info': 'displayEnter()',
                      'color': '5',
                      'definitions': data[0],
                      'traslate': data[1]
                    });
                  }

                  if (this.seleccionLenguajeTraduccion == 4) {
                    this.sintaxisGroup.push({
                      'data': arrayData[index],
                      'token': 'DSPE',
                      'info': 'displayEnter()',
                      'color': '5',
                      'definitions': data[0],
                      'traslate': data[1]
                    });
                  }

                  this.dataProcessDev = [];
                } else {
                  if (this._CMS.validarRest(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion) && this.bodyDeclare) {
                    this.sintaxisOpen = true;
                    let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
                    let data = this._libraryDefinitonsData.regresarDefincion('REST', arrayDefinitonsData[4], arrayDefinitonsData[6], '', '', '')

                    if (this.seleccionLenguajeTraduccion == 2) {
                      this.sintaxisGroup.push({
                        'data': this._CMS.validarRest(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                        'details': 'REST es una funcion exclusiva de UPWIND, sin embargo, una alternativa para que puedas sumar dos valores ' +
                          'en el lenguaje Java, es:',
                        'token': 'REST',
                        'info': 'rest()',
                        'color': '6',
                        'definitions': data[0],
                        'traslate': data[1]
                      });
                    }

                    if (this.seleccionLenguajeTraduccion == 3) {
                      this.sintaxisGroup.push({
                        'data': this._CMS.validarRest(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                        'details': 'REST es una funcion exclusiva de UPWIND, sin embargo, una alternativa para que puedas sumar dos valores ' +
                          'en el lenguaje Java, es:',
                        'token': 'REST',
                        'info': 'rest()',
                        'color': '6',
                        'definitions': data[0],
                        'traslate': data[1]
                      });
                    }

                    if (this.seleccionLenguajeTraduccion == 4) {
                      this.sintaxisGroup.push({
                        'data': arrayData[index],
                        'token': 'REST',
                        'info': 'rest()',
                        'color': '6',
                        'definitions': data[0],
                        'traslate': data[1]
                      });
                    }

                    this.dataProcessDev = [];
                  } else {
                    if (this._CMS.validarSum(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion) && this.bodyDeclare) {
                      this.sintaxisOpen = true;
                      let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
                      let data = this._libraryDefinitonsData.regresarDefincion('SUM', arrayDefinitonsData[4], arrayDefinitonsData[6], '', '', '')



                      if (this.seleccionLenguajeTraduccion == 2) {
                        this.sintaxisGroup.push({
                          'data': this._CMS.validarSum(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                          'details': 'SUM es una funcion exclusiva de UPWIND, sin embargo, una alternativa para que puedas sumar dos valores ' +
                            'en el lenguaje Java, es:',
                          'token': 'SUM',
                          'info': 'sum()',
                          'color': '7',
                          'definitions': data[0],
                          'traslate': data[1]
                        });
                      }

                      if (this.seleccionLenguajeTraduccion == 3) {
                        this.sintaxisGroup.push({
                          'data': this._CMS.validarSum(arrayData[index], this.arrayVar, this.synVar, this.seleccionLenguajeTraduccion),
                          'details': 'SUM es una funcion exclusiva de UPWIND, sin embargo, una alternativa para que puedas sumar dos valores ' +
                            'en el lenguaje C++, es:',
                          'token': 'SUM',
                          'info': 'sum()',
                          'color': '7',
                          'definitions': data[0],
                          'traslate': data[1]
                        });
                      }

                      if (this.seleccionLenguajeTraduccion == 4) {
                        this.sintaxisGroup.push({
                          'data': arrayData[index],
                          'token': 'SUM',
                          'info': 'sum()',
                          'color': '7',
                          'definitions': data[0],
                          'traslate': data[1]
                        });
                      }

                      this.dataProcessDev = [];
                    } else {
                      if (this._CMS.validarFor(arrayData[index], this.synVar, '', this.seleccionLenguajeTraduccion) && this.bodyDeclare) {
                        let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
                        let data = this._libraryDefinitonsData.regresarDefincion('FOR', arrayDefinitonsData[2], arrayDefinitonsData[4], '', arrayDefinitonsData[7], '', arrayDefinitonsData[8], arrayDefinitonsData[10], arrayDefinitonsData[11], this.seleccionLenguajeTraduccion)



                        if (this.seleccionLenguajeTraduccion == 2 || this.seleccionLenguajeTraduccion == 3) {
                          this.sintaxisGroup.push({
                            'data': this._CMS.validarFor(arrayData[index], this.synVar, '', this.seleccionLenguajeTraduccion),
                            'details': 'Para estos lenguajes, no es necesario declarar la variable iterable antes',
                            'token': 'FOR',
                            'info': 'for()',
                            'color': '8',
                            'definitions': data[0],
                            'traslate': data[1]
                          });
                        }

                        if (this.seleccionLenguajeTraduccion == 4) {
                          this.sintaxisOpen = true;
                          this.sintaxisGroup.push({
                            'data': arrayData[index],
                            'token': 'FOR',
                            'info': 'for()',
                            'color': '8',
                            'definitions': data[0],
                            'traslate': data[1]
                          });
                        }

                        this.dataProcessDev = [];
                      } else {
                        if (this._CMS.validarIf(arrayData[index], this.synVar) && this.bodyDeclare) {
                          this.sintaxisOpen = true;
                          let arrayDefinitonsData = this._CMS.analitedData(arrayData[index]);
                          let data = this._libraryDefinitonsData.regresarDefincion('IF', arrayDefinitonsData[2], arrayDefinitonsData[4], '', arrayDefinitonsData[3])


                          this.sintaxisGroup.push({
                            'data': arrayData[index],
                            'token': 'IF',
                            'info': 'if()',
                            'color': '9',
                            'definitions': data[0],
                            'traslate': data[1]
                          });

                            this.dataProcessDev = [];
                        } else {
                          if (this._CMS.validarBody(arrayData[index])) {
                            this.sintaxisOpen = true;


                            if (this.seleccionLenguajeTraduccion == 2) {
                              this.sintaxisGroup.push({
                                'data': "public class main {",
                                'main': 'public static void main (String [ ] args) {',
                                'token': 'BODY',
                                'info': 'body (función principal)',
                                'definitions': this._libraryDefinitonsData.regresarDefincion('BODY')
                              });
                            }

                            if (this.seleccionLenguajeTraduccion == 3) {
                              this.sintaxisGroup.push({
                                'data': "#include <iostream>",
                                'main': 'int main() {',
                                'token': 'BODY',
                                'info': 'body (función principal)',
                                'definitions': this._libraryDefinitonsData.regresarDefincion('BODY')
                              });
                            }

                            if (this.seleccionLenguajeTraduccion == 4) {
                              this.sintaxisGroup.push({
                                'data': arrayData[index],
                                'token': 'BODY',
                                'info': 'body (función principal)',
                                'definitions': this._libraryDefinitonsData.regresarDefincion('BODY')
                              });
                            }

                            this.dataProcessDev = [];
                            this.bodyDeclare = true;
                            this.countBody++;
                          } else {
                            if (arrayData[index] != '{' && arrayData[index] != 'LL_KEY' && arrayData[index] != null && arrayData[index] != '' && arrayData[index] != '}' && arrayData[index] != ' ' && arrayData[index] != undefined && this.bodyDeclare) {
                              this.erroresSystem.push({
                                'data': 'Linea: (' + (i + 1) + ')' + ' No coincide con ninguna expresion: ' + 'ERR KEY_NO_MATCH: ',
                                'token': arrayData[index],
                                'id': 'ERR_SYNTACTIC',
                                'output:': ' en al línea: ' + i
                              });
                              this.errorLexico = true;
                            } else {
                              if (!this.bodyDeclare || this.countBody > 1) {
                                this.erroresSystem.push({
                                  'data': 'Linea: (' + (i + 1) + ')' + ' No se ha encontrado la clase principal (body): ' + 'ERR BODY_NO_DECLARE_ARGS: ' + arrayData[index],
                                  'token': arrayData[index],
                                  'id': 'ERR_BODY_NOT_FOUND',
                                  'output:': ' en al línea: ' + i
                                });
                                this.errorLexico = true;
                              }

                              if (arrayData[arrayData.length - 1] != '}') {
                                this.erroresSystem.push({
                                  'data': 'Linea: (' + (i + 1) + ')' + ' Elementos fuera de la clase principal (body): ' + 'ERR ARGS_DECLARE_NO_BODY: ',
                                  'token': arrayData[index],
                                  'id': 'ERR_ARGS',
                                  'output:': ' en al línea: ' + i
                                });
                                this.errorLexico = true;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

    }


    this.dataInputTraslate = 'Reconociendo terminos...';

  }

  // SECCION DE CONFIGURACIONES:

  agruparSintactico(value) {
    this.groupSintDisplay.push(value)
  }

  sugerenciaPalabras(value) {
    this.opt1 = !this.opt1;
  }

  tamanioDinamico(value) {
    this.opt2 = !this.opt2;
  }

  correccionesPalabra(value) {
    this.opt3 = !this.opt3;
  }

  terminalErroes(value) {
    this.opt4 = !this.opt4;
  }

  panelDefiniciones(value) {
    this.definitionsPanel = !this.definitionsPanel;
  }

  // METADATOS WEB

  setMetaData(data) {
    this.title.setTitle(data.title);

    this.meta.updateTag({'name': 'keywords', 'content': data.keywords});
    this.meta.updateTag({'name': 'description', 'content': data.description});
    this.meta.updateTag({'name': 'twitter:card', 'content': 'summary_large_image'});
    this.meta.updateTag({'name': 'twitter:title', 'content': data.title});
    this.meta.updateTag({'name': 'twitter:text:title', 'content': data.title});
    this.meta.updateTag({'name': 'twitter:description', 'content': data.description});
    this.meta.updateTag({'name': 'twitter:image', 'content': data.image});
    this.meta.updateTag({'name': 'twitter:image:alt', 'content': data.title});
    this.meta.updateTag({'property': 'og:title', 'content': data.title});
    this.meta.updateTag({'property': 'og:url', 'content': data.url});
    this.meta.updateTag({'property': 'og:image', 'content': data.image});
    this.meta.updateTag({'property': 'og:image:alt', 'content': data.title});
    this.meta.updateTag({'property': 'og:description', 'content': data.description});
  }

  /**
   *
   body ( args ) {
 args i ;
 if ( i == b ) {
 int b = 5 ;
 args i = "5" ;
}
 for ( i = 0 ; i < 5 ; i ++ ) {
displayView ( i ) ;
}
a = mult ( b , 2 ) ;
a = rest ( b , 2 ) ;
a = sum ( b , 2 ) ;
displayEnter ( a ) ;
}
   */

}
