import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainTraductorComponent } from './components/main-traductor/main-traductor.component';

import {CoreCompilerService} from './services/core-compiler.service';
import {LibraryWordReservedService} from './services/library/library-word-reserved.service';
import {LibrarySymbolsService} from './services/library/library-symbols.service';
import {CheckIdentificadorService} from './services/library/check-identificador.service';
import {FormsModule} from '@angular/forms';
import {SyntacticCoreService} from './services/library/syntactic-core.service';
import {ControllerPilaService} from './services/ControllerSyn/ControllerPila.service';
import {PilaService} from './services/ControllerSyn/Pila.service';
import {NodoService} from './services/ControllerSyn/Nodo.service';
import {ControllerMSService} from './services/ControllerSyn/ControllerMS.service';
import { IntroductionComponent } from './components/introduction/introduction.component';
import {LibraryDefinitionsService} from './services/library/library-definitions.service';
import { SubnavComponent } from './components/subnav/subnav.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTraductorComponent,
    IntroductionComponent,
    SubnavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CoreCompilerService, LibraryWordReservedService, LibrarySymbolsService,
    CheckIdentificadorService, SyntacticCoreService, ControllerPilaService, PilaService,
  NodoService, ControllerMSService, LibraryDefinitionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
