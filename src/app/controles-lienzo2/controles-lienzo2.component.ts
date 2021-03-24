import { Component, OnInit, ViewChild } from "@angular/core";
import { EditorLienzoComponent } from "../../app/editor-lienzo/editor-lienzo.component";
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from "../../app/canvas.service";
import { ComunicadorService } from "../comunicador.service";
import { CanvasFactory } from "../canvas-factory";
@Component({
  selector: "app-controles-lienzo2",
  templateUrl: "./controles-lienzo2.component.html",
  styleUrls: ["./controles-lienzo2.component.scss"],
})
export class ControlesLienzo2Component implements OnInit {
  public lienzos = []; //lista objetos

  constructor(
    private lienzoService: CanvasService,
    private comunicadorService: ComunicadorService
  ) {}

  public EditorLienzoComponent: EditorLienzoComponent;
  canvas: fabric.Canvas;
  size: any;
  CanvasFactory: CanvasFactory;
  selected: fabric.Object;
  canvasImage: string;

  ngOnInit(): void {
    this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService)
    this.comunicadorService.recibirCanvasObs.subscribe(data => {console.warn(data), this.canvas = data})
    // this.lienzoService.().subscribe((data) => {
    //   (this.lienzos = data), console.log(data);
    // });
    // console.log(this.lienzos.length);
  }

  // @ViewChild("canvas", { static: false }) canvas: EditorLienzoComponent;

  public loadCanvasFromMocks(mock: string): void {
    //METODO PARA PROBAR, **BORRAR DE AQUI**

    console.log("N LIENZOS == " + this.lienzos.length);
    if (mock === "Aula 1") {
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
    // this.comunicadorService.enviarMensajeCanvasImage(this.canvasImage);
  }
}
