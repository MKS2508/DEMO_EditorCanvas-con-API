import { Component, OnInit, ViewChild } from "@angular/core";
import { EditorLienzoComponent } from "../../app/editor-lienzo/editor-lienzo.component";
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from "../../app/canvas.service";
import { ComunicadorService } from "../comunicador.service";
import { CanvasFactory } from "../canvas-factory";
import {CentroProps} from "../centro-props";
@Component({
  selector: "app-controles-lienzo2",
  templateUrl: "./controles-lienzo2.component.html",
  styleUrls: ["./controles-lienzo2.component.scss"],
})
export class ControlesLienzo2Component implements OnInit {
  public lienzos = []; //lista objetos
  private centro: CentroProps = {
    aulas: [], canvasImage: "", height: 2000, id: 0, idCTRSede: "", width: 2000

  };
  private centroSeleccionadoID: number = 888;

  constructor(
    private lienzoService: CanvasService,
    private comunicadorService: ComunicadorService
  ) {}

  public EditorLienzoComponent: EditorLienzoComponent;
  canvas: fabric.Canvas;
  size = {
    width: 10,
    height: 10
  }
  CanvasFactory: CanvasFactory;
  selected: fabric.Object;
  canvasImage: string = '';

  ngOnInit(): void {
    this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService)
    this.comunicadorService.recibirCanvasObs.subscribe(data => {console.warn(data), this.canvas = data})
    this.lienzoService.getCentro(this.centroSeleccionadoID).subscribe(data => {
      console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - ');
      this.lienzos = data.aulas;
      this.centro = data;

      for (let i = 0; i <= this.lienzos.length - 1; i++) {
        this.lienzos[i].idCTRCentro = data.id;

      }
      console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
      this.canvasImage = this.centro.canvasImage

      // this.setCanvasImage()
    });

  }

  // @ViewChild("canvas", { static: false }) canvas: EditorLienzoComponent;

  public loadCanvasFromMocks(mock: string): void {
    //METODO PARA PROBAR, **BORRAR DE AQUI**

    console.log("N LIENZOS == " + this.lienzos.length);
    if (mock === "Aula 1") {
        this.CanvasFactory.loadCanvasFromMocks(this.centro.aulas, this.centro)
        // this.comunicadorService.enviarMensajeLoadCanvas();
      // this.canvas.loadCanvasFromMocks(this.lienzos);
    } else if (mock === "Aula 2") {
      // this.canvas.loadCanvasFromMocks(this.lienzos);
    } else if (mock === "Aula 3") {
      // this.canvas.loadCanvasFromMocks(this.lienzos);
    }
  }

  public saveCanvasToDB(): void {
    console.log("lll")
    // this.canvas.saveCanvasToDB();
this.CanvasFactory.saveCanvasToBD()
  }

  public setCanvasImage(): void {
    this.CanvasFactory.setCanvasImageParam(this.canvasImage)
    // this.comunicadorService.enviarMensajeCanvasImage(this.canvasImage);
  }

  mostrarCentros() {
    this.comunicadorService.enviarMostrar(false)
  }
}
