import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient, HttpClientModule } from  '@angular/common/http'

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CanvasService } from './canvas.service';
import { EditorLienzoComponent } from './editor-lienzo/editor-lienzo.component'

@NgModule({
  declarations: [
    AppComponent,
    EditorLienzoComponent,
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
