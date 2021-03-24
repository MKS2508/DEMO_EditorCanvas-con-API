import { Component, OnInit, ViewChild } from "@angular/core";
import { EditorLienzoComponent } from "../app/editor-lienzo/editor-lienzo.component";
import { MenuCentroComponent} from "./menu-centro/menu-centro.component";
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from './canvas.service';
import {CentroProps} from "./centro-props";
import {ComunicadorService} from "./comunicador.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit{
  title = "angular-editor-fabric-js";

  public lienzos = []; //lista objetos
  public centro: CentroProps
  public mostrar: boolean;
  public centroSeleccionadoID: number;

  constructor(private _lienzoService : CanvasService, private comunicadorService: ComunicadorService){
  this.mostrar = false;
  }
  ngOnInit(): void {
    console.warn(this.lienzos.length)
    this.comunicadorService.recibirMostrarObs.subscribe(data => {this.mostrar = data; console.warn(data)})
    this.comunicadorService.recibirCentroObs.subscribe(data => {this.centroSeleccionadoID = data;

      this._lienzoService.getCentro(this.centroSeleccionadoID).subscribe(data => {
        console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
        this.lienzos = data.aulas;
        this.centro = data;

        for (let i = 0; i <= this.lienzos.length - 1; i++) {
          this.lienzos[i].idCTRCentro = data.id;

        }
        this.canvas.loadCanvasFromMocks(this.lienzos, this.centro);
        console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);

      });

    })
  }


  @ViewChild("canvas", { static: false }) canvas: EditorLienzoComponent;





  public loadCanvasFromMocks(mock: string): void{ //METODO PARA PROBAR, **BORRAR DE AQUI**

  console.log("N LIENZOS == "+this.lienzos.length)
    if (mock === "Centro 1") {
      this._lienzoService.getCentro(999).subscribe(data => {
        console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
          this.lienzos = data.aulas;
          this.centro = data;

        for (let i = 0; i <= this.lienzos.length - 1; i++) {
          this.lienzos[i].idCTRCentro = data.id;

      }
        this.canvas.loadCanvasFromMocks(this.lienzos, this.centro);
        console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);


      });

    } else if (mock === "Centro 2"){
      this._lienzoService.getCentro(888).subscribe(data => {
        console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
        this.lienzos = data.aulas;
        this.centro = data;

        for (let i = 0; i <= this.lienzos.length - 1; i++) {
          this.lienzos[i].idCTRCentro = data.id;

        }
        this.canvas.loadCanvasFromMocks(this.lienzos, this.centro);
        console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
    });}

  }



  public saveCanvasToDB(): void {
    this.canvas.saveCanvasToDB();
  }

  public confirmClear(): void {
    this.canvas.confirmClear();
  }

  public changeSize(): void {
    this.canvas.changeSize();
  }

  public addFigure(): void {
    this.canvas.addFigure();
  }

  public removeSelected(): void {//METODO PARA PROBAR, **BORRAR DE AQUI*
    this.canvas.removeSelected();
    this.lienzos = null;
    // this._lienzoService.getLienzos().subscribe(data => this.lienzos = data);
  }

  public sendToBack(): void {
    this.canvas.sendToBack();
  }

  public bringToFront():void {
    this.canvas.bringToFront();
  }

  public clone():void {
    this.canvas.clone();
  }

  public cleanSelect():void {
    this.canvas.cleanSelect();
  }

  public setCanvasFill():void {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage():void {
    this.canvas.setCanvasImage();
  }

  public setId():void {
    this.canvas.setId();
  }

  public setOpacity():void {
    this.canvas.setOpacity();
  }

  public setFill():void {
    this.canvas.setFill();
  }

}
