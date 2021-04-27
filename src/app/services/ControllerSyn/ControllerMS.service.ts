import {Injectable} from '@angular/core';
import {NodoService} from './Nodo.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerMSService {

  constructor() {

  }

  // BODY

  validarBody(value) {
    let arrayData = this.analitedData(value);

    return this.FP(arrayData[0]) && this.PA(arrayData[1]) && this.PR(arrayData[2]) && this.PC(arrayData[3]) && this.LL_K(arrayData[4]);

  }

  FP(valor) {
    return valor == 'body';
  }

  PR(valor) {
    return valor == 'args';
  }



  //Variables no inicializadas

  validarVariablesNoInicializadas(value, arrayVar, synVar?) {
    let data = value ;
    if (data!= null) {
      let arrayData = this.analitedData(value);

      if (this.TD(arrayData[0])) {
        if (this.IDE(arrayData[1], arrayVar) && this.FVVA(synVar, arrayData[1]) == 0) {
          if (this.TL(arrayData[2])){
            return arrayData.length == 3;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }


  TD(value) {
    if (value == 'args' || value == 'int'  || value == 'char' ) {
      return true;
    } else {
      return false;
    }
  }

  IDE(valor, arrayVar) {
    if (arrayVar.indexOf(valor) != -1) {
      return true;
    } else {
      return false;
    }
  }

  TL(value) {
    if (value == ';') {
      return true;
    } else {
      return false;
    }
  }

  // VARIABLES INICIALIZADAS

  validarVariablesInicializadas(value, arrayVar, synVar?, traduccion?) {
    let data = value ;
    if (data!= null) {
      let arrayData = this.analitedData(value);

      if (this.TDi(arrayData[0])) {
        if (this.IDEi(arrayData[1], arrayVar) && this.FVVA(synVar, arrayData[1]) == 0) {
          if (this.OA(arrayData[2])){
            if (arrayData[0] == 'int') {
              if (this.VALOR(arrayData[3])) {
                if (this.TLi(arrayData[4])) {
                  return arrayData.length == 5;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              if (this.COMP(arrayData[3])) {
                if (this.TLi(arrayData[4])) {
                  return arrayData.length == 5;
                } else {
                  return false;
                }
              }
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }


  TDi(value) {
    if (value == 'args' || value == 'char' || value == 'int') {
      return true;
    } else {
      return false;
    }
  }

  IDEi(valor, arrayVar) {
    if (arrayVar.indexOf(valor) != -1) {
      return true;
    } else {
      return false;
    }
  }

  OA(valor) {
    if (valor == '=') {
      return true;
    } else {
      return false;
    }
  }

  COMP(valor) {
    if (valor.charAt(0) == '"' && valor.charAt(valor.length-1) == '"') {
      return true;
    } else {
      return false;
    }
  }

  VALOR(valor) {

    var access = false;
    var valoresAceptados = /^[0-9]{1,1000}$/gm;
    //var valoresAceptados = /^[-]?[0-9]{1,1000}(?:.[0-9]{1,1000})?$/gm;
    if (valor.match(valoresAceptados)) {
      access = true;
    } else {
      access = false;
    }

    if (access) {
      return true;
    } else {
      return false;
    }
  }

  VALOR_ARGS(valor) {

    var access = false;
    var valoresAceptados = /^[0-9]{1,1000}$/gm;


    if (!access) {
      valor = valor.replace(/[ '"]+/g, '');
      if (valor.match(valoresAceptados)) {
        access = true;
      } else {
        access = false;
      }
    }

    return access;
  }

  TLi(value) {
    if (value == ';') {
      return true;
    } else {
      return false;
    }
  }


  // DISPLAYVIEW

  validarDisplayView(value, arrayVar, synVar?, traduccion?) {
    let arrayData = this.analitedData(value);

    if (this.FD(arrayData[0])) {
      if (this.PA(arrayData[1])) {
        if (this.COMP_VAR(arrayData[2], arrayVar, synVar)) {
          if (this.PC(arrayData[3])) {
            if (this.TL(arrayData[4])) {
              if (traduccion == 4) {
                return arrayData.length == 5;
              }

              if (traduccion == 3) {
                return "cout<< " + arrayData[2] + ";"
              }

              if (traduccion == 2) {
                return "System.out.println(" + arrayData[2] + ");";
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }  else {
      return false;
    }
  }

  FD(valor) {
    if (valor == 'displayView') {
      return true;
    } else {
      return false;
    }
  }

  PA(valor) {
    if (valor == '(') {
      return true;
    } else {
      return false;
    }
  }

  COMP_VAR(valor, arrayVar, synVar?) {

    let status = false;

    if (valor.charAt(0) == '"' && valor.charAt(valor.length-1) == '"') {
      return true;
    } else {
      /*if (arrayVar.indexOf(valor) != -1) {
        return true;
      } else {
        return false;
      }*/
      for (let i of synVar) {
        if (i.var == valor) {
          status = true;
        }
      }

      return status;
    }
  }


  PC(valor) {
    if (valor == ')') {
      return true;
    } else {
      return false;
    }
  }


  //FUNCION MULT

  validarMult(valor, varArray, synVar?, traduccion?) {

    let arrayData = this.analitedData(valor);

    if (this.FM(arrayData[2])) {

      let var0 = this.FVV(synVar, arrayData[0]);
      let var1 = this.FVV(synVar, arrayData[4]);
      let var2 = this.FVV(synVar, arrayData[6]);

      if (var0[1] && var0[0].tipo == 'int' || (var0[0].tipo == 'args' && var0[0].valor == '$NA')) {
        if (this.OA(arrayData[1])) {
          if (this.FM(arrayData[2])) {
            if (this.PA(arrayData[3])) {
              if (this.COMP_VAR_NUM(arrayData[4], varArray) || ((var1[1] && var1[0].tipo == 'int' && var1[0].valor != '$NA') || this.VALOR_ARGS(var1[0].valor) )) {
                if (this.SS(arrayData[5])) {
                  if (this.COMP_VAR_NUM(arrayData[6], varArray) || ((var2[1] && var2[0].tipo == 'int' && var2[0].valor != '$NA') || this.VALOR_ARGS(var2[0].valor) )) {
                    if (this.PC(arrayData[7])) {
                      if (this.TL(arrayData[8])) {
                        if (traduccion == 4) {
                          return arrayData.length == 9;
                        } else {
                          return "int " + arrayData[0] + " " + arrayData[1] + " " + arrayData[4] + " * " + arrayData[6] + arrayData[8];
                        }
                      }
                    } else {
                      return false;
                    }
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      } else {
        return false;
      }



    } else {
      return false;
    }
  }

  FM(valor) {
    return valor == 'mult';
  }

  SS(valor) {
    return valor == ',';
  }

  COMP_VAR_NUM(valor, arrayVar, synVar?) {

    if (this.VALOR(valor)) {
      return true;
    } else {

      return false;
      /*if (arrayVar.indexOf(valor) != -1) {
        return true;
      } else {
        return false;
      }*/

    }

  }


  // DISPLAYENTER

  validarDisplayEnter(valor, arrayVar, synVar?, traduccion?) {

    let arrayData = this.analitedData(valor);

    if (this.FE(arrayData[0])) {
      let var0 = this.FVV(synVar, arrayData[2]);
      if (this.PA(arrayData[1])) {
        if (var0[1]) {
          if (this.PC(arrayData[3])) {
            if (this.TL(arrayData[4])) {
              if (traduccion == 4) {
                return arrayData.length == 5;
              }
              if (traduccion == 3) {
                return "cin>>" + arrayData[2] ;
              }
              if (traduccion == 2) {
                return "Scanner " + arrayData[2] + " = new Scanner(System.in);" + "\n\t String " + arrayData[2] + "1 = " + arrayData[2] + ".nextLine();"
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  FE(valor) {
    return valor == 'displayEnter';
  }

  //REST
  validarRest(valor, varArray, synVar?, traduccion?) {
    let arrayData = this.analitedData(valor);

    if (this.FR(arrayData[2])) {

      let var0 = this.FVV(synVar, arrayData[0]);
      let var1 = this.FVV(synVar, arrayData[4]);
      let var2 = this.FVV(synVar, arrayData[6]);

      if (var0[1] && var0[0].tipo == 'int' || (var0[0].tipo == 'args' && var0[0].valor == '$NA')) {
        if (this.OA(arrayData[1])) {
          if (this.FR(arrayData[2])) {
            if (this.PA(arrayData[3])) {
              if (this.COMP_VAR_NUM(arrayData[4], varArray) || ((var1[1] && var1[0].tipo == 'int' && var1[0].valor != '$NA') || this.VALOR_ARGS(var1[0].valor) )) {
                if (this.SS(arrayData[5])) {
                  if (this.COMP_VAR_NUM(arrayData[6], varArray) || ((var2[1] && var2[0].tipo == 'int' && var2[0].valor != '$NA') || this.VALOR_ARGS(var2[0].valor) )) {
                    if (this.PC(arrayData[7])) {
                      if (this.TL(arrayData[8])) {
                        if (traduccion == 4) {
                          return arrayData.length == 9;
                        } else {
                          return "int " + arrayData[0] + " " + arrayData[1] + " " + arrayData[4] + " - " + arrayData[6] + arrayData[8];
                        }
                      }
                    } else {
                      return false;
                    }
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      } else {
        return false;
      }


    } else {
      return false;
    }

  }

  FR(valor) {
    return valor == 'rest';
  }


  FVV(dataArray, variable) {

    let status = false;
    let dataValue = [];
    let type = '';
    let varValor = '';

    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].var == variable) {
        status = true;
        dataValue[0] = dataArray[i];
        type = dataArray[i].tipo;
        varValor = dataArray[i].valor;
        break;
      } else {
        status = false;
      }
    }

    dataValue[1] = status;
    dataValue[2] = type;
    dataValue[3] = varValor;

    return dataValue;
  }

   FVVA(dataArray, variable) {

    let contador = 0;


    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].var == variable) {
            contador++;
      }
    }

    console.log(contador)

    return contador;
  }

  // SUM

  validarSum(valor, varArray, dataArray?, traduccion?) {
    let arrayData = this.analitedData(valor);

    try {
      if (this.SUM(arrayData[2])) {

        let var0 = this.FVV(dataArray, arrayData[0]);
        let var1 = this.FVV(dataArray, arrayData[4]);
        let var2 = this.FVV(dataArray, arrayData[6]);

        if (var0[1] && var0[0].tipo == 'int' || (var0[0].tipo == 'args' && var0[0].valor == '$NA')) {
          if (this.OA(arrayData[1])) {
            if (this.SUM(arrayData[2])) {
              if (this.PA(arrayData[3])) {
                if (this.COMP_VAR_NUM(arrayData[4], varArray) || ((var1[1] && var1[0].tipo == 'int' && var1[0].valor != '$NA') || this.VALOR_ARGS(var1[0].valor) )) {
                  if (this.SS(arrayData[5])) {
                    if (this.COMP_VAR_NUM(arrayData[6], varArray) || ((var2[1] && var2[0].tipo == 'int' && var2[0].valor != '$NA') || this.VALOR_ARGS(var2[0].valor) )) {
                      if (this.PC(arrayData[7])) {
                        if (this.TL(arrayData[8])) {
                          if (traduccion == 4) {
                            return arrayData.length == 9;
                          } else {
                            return "int " + arrayData[0] + " " + arrayData[1] + " " + arrayData[4] + " + " + arrayData[6] + arrayData[8];
                          }
                        }
                      } else {
                        return false;
                      }
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          }
        } else {
          return false;
        }


      } else {
        return false;
      }
    } catch (e) {
      return false;
    }

  }

  SUM(valor) {
    return valor == 'sum';
  }

  // FOR

  validarFor(valor, arrayVar, dataArray?, traduccion?) {
    let arrayData = this.analitedData(valor);

    try {
      if (this.FOR(arrayData[0])) {

        let var0 = this.FVV(arrayVar, arrayData[2]);
        let var1 = this.FVV(arrayVar, arrayData[6]);
        let var2 = this.FVV(arrayVar, arrayData[10]);

        if (this.PA(arrayData[1])) {
          if ((var0[1] && var0[0].tipo == 'int' || (var0[0].tipo == 'args' && var0[0].valor == '$NA'))) {
            if (this.OA(arrayData[3])) {
              if (this.VALOR(arrayData[4])) {
                if (this.TL(arrayData[5])) {
                  if ((var1[1] && var1[0].tipo == 'int' || (var1[0].tipo == 'args' && var1[0].valor == '$NA'))) {
                    if (this.COND(arrayData[7])) {
                      if (this.VALOR(arrayData[8])) {
                        if (this.TL(arrayData[9])) {
                          if ((var2[1] && var2[0].tipo == 'int' || (var2[0].tipo == 'args' && var2[0].valor == '$NA'))) {
                            if (this.INCR(arrayData[11])) {
                              if (this.PC(arrayData[12])) {
                                if (this.LL_K(arrayData[13])) {
                                  if (traduccion == 4) {
                                    return arrayData.length == 14;
                                  } else {
                                    return arrayData[0] + " " + arrayData[1] + " int " + arrayData[2] + " " + arrayData[3] + " " + arrayData[4]
                                      + arrayData[5] + " " + arrayData[6] + " " + arrayData[7] + " " + arrayData[8] +
                                      arrayData[9] + " " + arrayData[10] + " " + arrayData[11] + " " + arrayData[12] + " " + arrayData[13]
                                  }
                                } else {
                                  return false;
                                }
                              } else {
                                return false;
                              }
                            } else {
                              return false;
                            }
                          } else {
                            return false;
                          }
                        } else {
                          return false;
                        }
                      } else {
                        return false;
                      }
                    } else {
                      return false;
                    }
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  FOR(valor) {
    return valor == 'for';
  }

  COND(valor) {
    return valor == '<' || valor == '>';
  }

  INCR(valor) {
    return valor == '++' || valor == '--';
  }

  // IF

  validarIf(valor, arrayVar) {
    let arrayData = this.analitedData(valor);

    if (this.IF(arrayData[0])) {
      let status = false;
      let var0 = this.FVV(arrayVar, arrayData[2]);

      try {
        let var1 = this.FVV(arrayVar, arrayData[4]);
        if (this.PA(arrayData[1])) {
          if (var0[1] && var0[0].valor != '$NA') {
            if (this.COND_IF(arrayData[3])) {
              if (var1[0].tipo == var0[0].tipo && var1[0].valor != '$NA') {
                if (this.PC(arrayData[5])) {
                  if (this.LL_K(arrayData[6])) {
                    status = true;
                    return status;
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }


    } else {
      return false;
    }

  }

  IF(valor) {
    return valor == 'if';
  }

  COND_IF(valor) {
    return valor == '<' || valor == '>' || valor == '==' || valor == '!=';
  }

  LL_K(valor) {
    return valor == '{';
  }

  declaratedVarAdmisible(data, valor, tipo?, var2?, valor2?, tipo2?) {
    var status = false;
    let dataValue = [];
    let type = '';
    let varValor = '';
    for (let val of data) {
      if (val.var == valor) {
        status = true;
        dataValue[0] = val;
        type = val.tipo;
        varValor = val.valor;
      } else {
        status = false;
      }
    }

    if (var2) {
      for (let val of data) {
        if (val.var == valor2 && val.tipo == tipo) {
          status = true;
        } else {
          status = false;
        }
      }
    }

    dataValue[1] = status;
    dataValue[2] = type;
    dataValue[3] = varValor;

    return dataValue;
  }

  analitedData(valor) {
    const regex = /[^\s"']+|"[^"]*"|'[^']*'/gm;
    const str = valor;
    let m;
    let arrayData = [];

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        arrayData.push(match);
      });
    }
    return arrayData;
  }

}
