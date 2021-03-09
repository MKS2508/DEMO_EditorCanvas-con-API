import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from  '@angular/common/http'

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CanvasService } from './canvas.service';
import { EditorLienzoComponent } from './editor-lienzo/editor-lienzo.component';
import { ControlesLienzoComponent } from './controles-lienzo/controles-lienzo.component';
import { ControlesLienzo2Component } from './controles-lienzo2/controles-lienzo2.component';
import { ControlesLienzo3Component } from './controles-lienzo3/controles-lienzo3.component'

@NgModule({
  declarations: [
    AppComponent,
    EditorLienzoComponent,
    ControlesLienzoComponent,
    ControlesLienzo2Component,
    ControlesLienzo3Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule,
    HttpClientModule,
  ],
  providers: [ CanvasService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
