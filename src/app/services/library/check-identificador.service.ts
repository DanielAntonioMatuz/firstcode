import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckIdentificadorService {

  public resultEvaluation = false;

  constructor() { }

  validarIdentificador(value) {
    const regex = /[^A-Za-z0-9.@_-~#]|[0-9]|[.]|[#]|[@]|[\}]|['|']|[~]|[\{]|["]|[`]+/gm;
    const str = value;
    let m;
    this.resultEvaluation = false;

    while ((m = regex.exec(str)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        this.resultEvaluation = true;
      });
    }

    if (value.charAt(0) == "\"") {
      this.resultEvaluation = true;
    }

    return this.resultEvaluation;

  }


  verificadorIlegales(cadena) {
    const regex = /[^A-Za-z0-9.@_-~#]+/gm;
    const str = cadena;
    let m;
    let resultado = false;

    while ((m = regex.exec(str)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        resultado = true
      });
    }
    return resultado
  }


  verificadorArgumento(cadena) {
    const regex = /[0-9]/gm;
    const str = cadena;
    let m;
    let evaluation = false;

    while ((m = regex.exec(str)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);

        if (!this.verificadorIlegales(m)) {
          evaluation = true;
        } else {
          evaluation = false;
        }

      });
    }


    const regex2 = /[^\s"']+|"[^"]*"|'[^']*'/gm;
    const str2 = cadena;
    let m2;

    while ((m2 = regex2.exec(str2)) !== null) {
      if (m2.index === regex2.lastIndex) {
        regex2.lastIndex++;
      }

      m2.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        evaluation = true;
      });
    }

    return evaluation;

  }


}
