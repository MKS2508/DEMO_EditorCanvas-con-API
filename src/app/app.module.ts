import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from  '@angular/common/http'

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CanvasService } from './canvas.service';
import { EditorLienzoComponent } from './editor-lienzo/editor-lienzo.component';
import { MenuCentroComponent } from './menu-centro/menu-centro.component';
import { ControlesLienzoComponent } from './controles-lienzo/controles-lienzo.component';
import { ControlesLienzo2Component } from './controles-lienzo2/controles-lienzo2.component';
import { ControlesLienzo3Component } from './controles-lienzo3/controles-lienzo3.component'

@NgModule({
  declarations: [
    AppComponent,
    EditorLienzoComponent,
    MenuCentroComponent,
  ],
  imports: [
    ControlesLienzo2Component,
    ControlesLienzo3Component,
    ControlesLienzoComponent,
    BrowserModule,
    FormsModule,
    ColorPickerModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ CanvasService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
