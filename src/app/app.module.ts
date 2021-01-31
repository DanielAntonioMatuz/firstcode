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

@NgModule({
  declarations: [
    AppComponent,
    MainTraductorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CoreCompilerService, LibraryWordReservedService, LibrarySymbolsService, CheckIdentificadorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
