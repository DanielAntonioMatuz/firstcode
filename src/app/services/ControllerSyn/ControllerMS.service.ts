import {Injectable} from '@angular/core';
import {NodoService} from './Nodo.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerMSService {

  constructor() {

  }

  //Variables no inicializadas

  validarVariablesNoInicializadas(value, arrayVar) {
    let data = value ;
    if (data!= null) {
      let arrayData = this.analitedData(value);
      console.log(arrayData);

      if (this.TD(arrayData[0])) {
        if (this.IDE(arrayData[1], arrayVar)) {
          if (this.TL(arrayData[2])){
            return true;
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
      console.log("SE ESPERA UN TD");
      return false;
    }
  }

  IDE(valor, arrayVar) {
    if (arrayVar.indexOf(valor) != -1) {
      return true;
    } else {
      console.log("SE ESPERA UN IDE");
      return false;
    }
  }

  TL(value) {
    if (value == ';') {
      return true;
    } else {
      console.log("SE ESPERA UN TL");
      return false;
    }
  }

  // VARIABLES INICIALIZADAS

  validarVariablesInicializadas(value, arrayVar) {
    let data = value ;
    if (data!= null) {
      let arrayData = this.analitedData(value);
      console.log(arrayData);

      if (this.TDi(arrayData[0])) {
        if (this.IDEi(arrayData[1], arrayVar)) {
          if (this.OA(arrayData[2])){
            if (arrayData[0] == 'int') {
              if (this.VALOR(arrayData[3])) {
                if (this.TLi(arrayData[4])) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else {
              if (this.COMP(arrayData[3])) {
                if (this.TLi(arrayData[4])) {
                  return true;
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
      console.log("SE ESPERA UN IDE");
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
    console.log(valor.charAt(valor.length-1));
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
      console.log("SE ESPERA UN NUMERO");
      return false;
    }
  }

  TLi(value) {
    if (value == ';') {
      return true;
    } else {
      console.log("SE ESPERA UN TL");
      return false;
    }
  }


  // DISPLAYVIEW

  validarDisplayView(value, arrayVar) {
    let arrayData = this.analitedData(value);

    if (this.FD(arrayData[0])) {
      if (this.PA(arrayData[1])) {
        if (this.COMP_VAR(arrayData[2], arrayVar)) {
          if (this.PC(arrayData[3])) {
            if (this.TL(arrayData[4])) {
              return true;
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

  COMP_VAR(valor, arrayVar) {
    if (valor.charAt(0) == '"' && valor.charAt(valor.length-1) == '"') {
      return true;
    } else {
      if (arrayVar.indexOf(valor) != -1) {
        return true;
      } else {
        console.log("SE ESPERA UN IDE");
        return false;
      }
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

  validarMult(valor, varArray) {

    let arrayData = this.analitedData(valor);

    if (this.IDEi(arrayData[0], varArray)) {
      if (this.OA(arrayData[1])) {
        if (this.FM(arrayData[2])) {
          if (this.PA(arrayData[3])) {
            if (this.COMP_VAR_NUM(arrayData[4], varArray)) {
              if (this.SS(arrayData[5])) {
                if (this.COMP_VAR_NUM(arrayData[6], varArray)) {
                  if (this.PC(arrayData[7])) {
                    if (this.TL(arrayData[8])) {
                      return true;
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
  }

  FM(valor) {
    return valor == 'mult';
  }

  SS(valor) {
    return valor == ',';
  }

  COMP_VAR_NUM(valor, arrayVar) {
    if (this.VALOR(valor)) {
      return true;
    } else {
      if (arrayVar.indexOf(valor) != -1) {
        return true;
      } else {
        return false;
      }
    }
  }


  // DISPLAYENTER

  validarDisplayEnter(valor, arrayVar) {

    let arrayData = this.analitedData(valor);

    if (this.FE(arrayData[0])) {
      if (this.PA(arrayData[1])) {
        if (this.IDEi(arrayData[2], arrayVar)) {
          console.log("TRUE [0]")

          if (this.PC(arrayData[3])) {
            if (this.TL(arrayData[4])) {
              return true;
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
  validarRest(valor, varArray) {
    let arrayData = this.analitedData(valor);

    if (this.IDEi(arrayData[0], varArray)) {
      if (this.OA(arrayData[1])) {
        if (this.FR(arrayData[2])) {
          if (this.PA(arrayData[3])) {
            if (this.COMP_VAR_NUM(arrayData[4], varArray)) {
              if (this.SS(arrayData[5])) {
                if (this.COMP_VAR_NUM(arrayData[6], varArray)) {
                  if (this.PC(arrayData[7])) {
                    if (this.TL(arrayData[8])) {
                      return true;
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
  }

  FR(valor) {
    return valor == 'rest';
  }

  // SUM

  validarSum(valor, varArray) {
    let arrayData = this.analitedData(valor);

    if (this.IDEi(arrayData[0], varArray)) {
      if (this.OA(arrayData[1])) {
        if (this.SUM(arrayData[2])) {
          if (this.PA(arrayData[3])) {
            if (this.COMP_VAR_NUM(arrayData[4], varArray)) {
              if (this.SS(arrayData[5])) {
                if (this.COMP_VAR_NUM(arrayData[6], varArray)) {
                  if (this.PC(arrayData[7])) {
                    if (this.TL(arrayData[8])) {
                      return true;
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
  }

  SUM(valor) {
    return valor == 'sum';
  }

  // FOR

  validarFor(valor, arrayVar) {
    let arrayData = this.analitedData(valor);

    if (this.FOR(arrayData[0])) {
      if (this.PA(arrayData[1])) {
        if (this.IDE(arrayData[2], arrayVar)) {
          if (this.OA(arrayData[3])) {
            if (this.VALOR(arrayData[4])) {
              if (this.TL(arrayData[5])) {
                if (this.IDE(arrayData[6], arrayVar)) {
                  if (this.COND(arrayData[7])) {
                    if (this.VALOR(arrayData[8])) {
                      if (this.TL(arrayData[9])) {
                        if (this.IDE(arrayData[10], arrayVar)) {
                          if (this.INCR(arrayData[11])) {
                            if (this.PC(arrayData[12])) {
                              if (this.LL_K(arrayData[13])) {
                                return true;
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
    console.log(arrayData);

    if (this.IF(arrayData[0])) {
      if (this.PA(arrayData[1])) {
        if (this.IDE(arrayData[2], arrayVar)) {
          if (this.COND_IF(arrayData[3])) {
            if (this.IDE(arrayData[4], arrayVar)) {
              if (this.PC(arrayData[5])) {
                if (this.LL_K(arrayData[6])) {
                  return true;
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
