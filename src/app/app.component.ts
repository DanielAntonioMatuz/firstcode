import {Component, ViewChild} from '@angular/core';
import {LibraryWordReservedService} from './services/library/library-word-reserved.service';
import {LibrarySymbolsService} from './services/library/library-symbols.service';
import {CheckIdentificadorService} from './services/library/check-identificador.service';
import {Meta, Title} from '@angular/platform-browser';
import {stringify} from '@angular/compiler/src/util';


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


  @ViewChild('opcionLenguaje') opcionLenguaje: string;

  constructor(
    private _libraryWord: LibraryWordReservedService,
    private _librarySymbols: LibrarySymbolsService,
    private _evaluationIdentificador: CheckIdentificadorService,
    private meta: Meta,
    private title: Title
  ) {

    this.arrayColor = ['#ec6a5f', '#5fecaa', '#52e69c', '#000000', '#EC5F95', '#6b52e6', '#64CC57'];
  }

  seleccionLg(value) {
    this.seleccionLenguaje = parseInt(value);
  }

  seleccionLgTraducir(value) {
    this.seleccionLenguajeTraduccion = value;
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
    this.selectMode(value);
    this.controllerText(value);
    this.scrollAutomaticTraslate();

    if (value != '') {
      this.detailsInit = false;
    } else {
      this.detailsInit = true;
    }


    this.dataProcessDev = [];
    this.erroresSystem = [];


    this.dataLexicoCorrect = '';
    this.dataInputTraslate = '';
    this.errorLexico = false;
    this.predictivoUpwind = [];

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

        this.predictivoUpwind = this._libraryWord.predictivoUpwind(datosProcesados[i]);

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
          } else {
            this.dataInputTraslate += 'Error - no valido' + '\n';
            this.dataProcessDev[i] = {'data': datosProcesados[i], 'token': 'Error - no valido', 'id': 'KNW'};
          }
        }


        // Bloque de Analizador SINTACTICO


      }

    }

    //Librerias de JAVA
    if (this.seleccionLenguaje == 2) {
      for (let i = 0; i < datosProcesados.length; i++) {

        if (this._libraryWord.validarPalabraCJava(datosProcesados[i])) {

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

          this.dataLexicoCorrect += datosProcesados[i] + '\n';
          this.dataInputTraslate += this._libraryWord.regresarSignificadoEspañoltoJava(datosProcesados[i]) + '\n';

          let arrayData = this._libraryWord.regresarSignificadoEspañoltoJavaTraducido(datosProcesados[i]);

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

  // SECCION DE CONFIGURACIONES:

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

}
