import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorLienzoComponent } from '../app/editor-lienzo/editor-lienzo.component';
import { MenuCentroComponent} from './menu-centro/menu-centro.component';
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from './canvas.service';
import {CentroProps} from './centro-props';
import {ComunicadorService} from './comunicador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private  lienzoService: CanvasService, private comunicadorService: ComunicadorService) {
  this.mostrar = false;
  }
  title = 'angular-editor-fabric-js';

  public lienzos = []; // lista objetos
  public centro: CentroProps;
  public mostrar: boolean;
  public centroSeleccionadoID: number;


  @ViewChild('canvas', { static: false }) canvas: EditorLienzoComponent;
  editorCanvas: boolean;
  ngOnInit(): void {
    this.editorCanvas = false;
    this.comunicadorService.recibirEditorObs.subscribe(data => {
      if (data === true) {
        this.editorCanvas = true;
      } else {
        this.editorCanvas = false;
      }
    });
    console.warn(this.lienzos.length);
    this.comunicadorService.recibirMostrarObs.subscribe(data => {this.mostrar = data; console.warn(data); });
    this.comunicadorService.recibirCentroObs.subscribe(data => {this.centroSeleccionadoID = data;

                                                                this.lienzoService.getCentro(this.centroSeleccionadoID).subscribe(data => {
        console.log('IDCENTRO ' + ' ****** ' + data.id + ' - - - - - - - - - ' + data.aulas[0].idCTRCentro);
        this.lienzos = data.aulas;
        this.centro = data;

        for (let i = 0; i <= this.lienzos.length - 1; i++) {
          this.lienzos[i].idCTRCentro = data.id;

        }
        // factory
        this.canvas.loadCanvasFromMocks(this.lienzos, this.centro);
        console.log('IDCENTRO ' + ' ****** ' + data.id + ' - - - - - - - - - ' + data.aulas[0].idCTRCentro);

      });

    });
  }


  activarEdicion(b: boolean) {
    this.comunicadorService.enviarEditor(b);
  }
}
