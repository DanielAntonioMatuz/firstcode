import {Component, ViewChild} from '@angular/core';
import {LibraryWordReservedService} from './services/library/library-word-reserved.service';
import {LibrarySymbolsService} from './services/library/library-symbols.service';
import {CheckIdentificadorService} from './services/library/check-identificador.service';
import {$} from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firstcode';
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

  @ViewChild('opcionLenguaje') opcionLenguaje: string;

  constructor(
    private _libraryWord: LibraryWordReservedService,
    private _librarySymbols: LibrarySymbolsService,
    private _evaluationIdentificador: CheckIdentificadorService
  ) {

    this.arrayColor = ['#EC6A5F', '#5fecaa', '#52e69c', '#000000', '#EC5F95', '#6b52e6'];
  }

  seleccionLg(value) {
    console.log(value);
    this.seleccionLenguaje = parseInt(value);
  }

  seleccionLgTraducir(value) {
    console.log(value + 'TD');
    this.seleccionLenguajeTraduccion = value;
  }

  randomValue() {
    if (this.valColor == 5) {
      this.valColor = -1;
    }
    this.valColor++;
    return this.valColor;
  }


  controllerText(value) {

    if (value.length < 150) {
      var intro = document.getElementById('terminalOutput');
      intro.style.fontSize = '30px';

    }

    if (value.length > 150 && value.length < 250) {
      var intro = document.getElementById('terminalOutput');
      intro.style.fontSize = '20px';

    }

    if (value.length > 250) {
      var intro = document.getElementById('terminalOutput');
      intro.style.fontSize = '18px';
    }
  }

  buttonClean(value) {
    this.dataProcessDev = [];
    this.inpuTerminalTraslate = '';
    this.modoText = 'sin cambios';
  }

  selectMode(value) {
    if (value == '') {
      this.modoText = 'sin cambios';
    } else {
      this.modoText = 'limpiar';
    }
  }

  inputData(value) {
    this.selectMode(value);
    if (this.modoDev) {
      this.controllerText(value);
    }

    this.dataProcessDev = [];

    console.log(this.dataProcessDev.length);

    this.dataLexicoCorrect = '';
    this.dataInputTraslate = '';
    let FirstData = value.charAt(0);

    const regex = /[^\s"']+|"[^"]*"|'[^']*'/gm;
    const str = value;
    let dataValue = null;
    let datosProcesados = [];

    let i = 0;
    while ((dataValue = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (dataValue.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      dataValue.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        datosProcesados[i] = match;
        i++;
      });
    }

    // Librerias de UPWIND

    if (this.seleccionLenguaje == 1) {
      for (let i = 0; i < datosProcesados.length; i++) {

        if (this._libraryWord.validarPalabra(datosProcesados[i])) {
          console.log('A1');

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

              var valoresAceptados = /^[-]?[0-9]{1,1000}(?:.[0-9]{1,1000})?$/gm;
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
                  this.dataInputTraslate += 'Texto' + '\n';
                  this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Texto', 'id': 'TXT'};
                  access = true;
                } else {
                  this.dataInputTraslate += 'NO RECONOCIDO' + '\n';
                  this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'No reconocido', 'id': 'KNW'};
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
                    console.log(`Found match, group ${groupIndex}: ${match}`);

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
                console.log('A10');

              }

            } catch (e) {
              console.log('A8');

            }
          } else {
            this.dataInputTraslate += 'Identificador invalido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador invalido', 'id': 'KNW'};
          }
        } else {

          console.log('FRS: ' + FirstData);
          if (FirstData != '"') {
            this.dataInputTraslate += 'Identificador' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador', 'id': 'IDE'};
          } else {
            this.dataInputTraslate += 'Error - no valido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Error - no valido', 'id': 'KNW'};
          }
        }

      }
    }

      //Librerias de JAVA
    if (this.seleccionLenguaje == 2) {
      for (let i = 0; i < datosProcesados.length; i++) {

        if (this._libraryWord.validarPalabraCJava(datosProcesados[i])) {
          console.log('A1');

          this.dataLexicoCorrect += datosProcesados[i] + '\n';
          this.dataInputTraslate += this._libraryWord.regresarSignificadoJava(datosProcesados[i]) + '\n';


          this.dataProcessDev[i] = {
            'data': datosProcesados[i],
            'token': this._libraryWord.regresarSignificadoJava(datosProcesados[i]),
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

              var valoresAceptados = /^[-]?[0-9]{1,1000}(?:.[0-9]{1,1000})?$/gm;
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
                  this.dataInputTraslate += 'Texto' + '\n';
                  this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Texto', 'id': 'TXT'};
                  access = true;
                } else {
                  this.dataInputTraslate += 'NO RECONOCIDO' + '\n';
                  this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'No reconocido', 'id': 'KNW'};
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
                    console.log(`Found match, group ${groupIndex}: ${match}`);

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
                console.log('A10');

              }

            } catch (e) {
              console.log('A8');

            }
          } else {
            this.dataInputTraslate += 'Identificador invalido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador invalido', 'id': 'KNW'};
          }
        } else {

          console.log('FRS: ' + FirstData);
          if (FirstData != '"') {
            this.dataInputTraslate += 'Identificador' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador', 'id': 'IDE'};
          } else {
            this.dataInputTraslate += 'Error - no valido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Error - no valido', 'id': 'KNW'};
          }
        }

      }
    }

      // Librerias de C++
    if (this.seleccionLenguaje == 3) {
      for (let i = 0; i < datosProcesados.length; i++) {

        if (this._libraryWord.validarPalabraCPlus(datosProcesados[i])) {
          console.log('A1');

          this.dataLexicoCorrect += datosProcesados[i] + '\n';
          this.dataInputTraslate += this._libraryWord.regresarSignificadoCplus(datosProcesados[i]) + '\n';


          this.dataProcessDev[i] = {
            'data': datosProcesados[i],
            'token': this._libraryWord.regresarSignificadoCplus(datosProcesados[i]),
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

              var valoresAceptados = /^[-]?[0-9]{1,1000}(?:.[0-9]{1,1000})?$/gm;
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
                  this.dataInputTraslate += 'Texto' + '\n';
                  this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Texto', 'id': 'TXT'};
                  access = true;
                } else {
                  this.dataInputTraslate += 'NO RECONOCIDO' + '\n';
                  this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'No reconocido', 'id': 'KNW'};
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
                    console.log(`Found match, group ${groupIndex}: ${match}`);

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
                console.log('A10');

              }

            } catch (e) {
              console.log('A8');

            }
          } else {
            this.dataInputTraslate += 'Identificador invalido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador invalido', 'id': 'KNW'};
          }
        } else {

          console.log('FRS: ' + FirstData);
          if (FirstData != '"') {
            this.dataInputTraslate += 'Identificador' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Identificador', 'id': 'IDE'};
          } else {
            this.dataInputTraslate += 'Error - no valido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Error - no valido', 'id': 'KNW'};
          }
        }

      }
    }

      //Librerias de ESPAÑOL
    if (this.seleccionLenguaje == 4) {
      for (let i = 0; i < datosProcesados.length; i++) {

        if (this._libraryWord.validarPalabraEspañol(datosProcesados[i]) && this.seleccionLenguajeTraduccion == 2) {
          console.log('A1');

          this.dataLexicoCorrect += datosProcesados[i] + '\n';
          this.dataInputTraslate += this._libraryWord.regresarSignificadoEspañoltoJava(datosProcesados[i]) + '\n';

          let arrayData = this._libraryWord.regresarSignificadoEspañoltoJavaTraducido(datosProcesados[i]);
          console.log(arrayData)

          this.dataProcessDev[i] = {
            'data': datosProcesados[i],
            'token': this._libraryWord.regresarSignificadoEspañoltoJava(datosProcesados[i]).toUpperCase(),
            'id': 'RES',
            'definicion': arrayData[0],
            'ejemplo': arrayData[1]
          };


        }

      }
    }



    this.dataInputTraslate = 'Reconociendo terminos...';

  }

}
