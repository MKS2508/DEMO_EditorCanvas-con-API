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
  private _selecID: number;

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
    this._selecID =888

      this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService)
    this.comunicadorService.recibirCanvasObs.subscribe(data => {console.warn(data), this.canvas = data})

    this.comunicadorService.recibirCentroObs.subscribe(data => {
        console.log('IDCENTRO '+' ****** '+data+' - - - - - - - - - ');
      this.lienzoService.getCentro(data).subscribe(data => {
        console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - ');
        this.lienzos = data.aulas;
        this.centro = data;
        this.centroSeleccionadoID = data.id
        for (let i = 0; i <= this.lienzos.length - 1; i++) {
          this.lienzos[i].idCTRCentro = data.id;

        }
        // console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
        this.canvasImage = this.centro.canvasImage
        console.log('IDCENTRO '+' ****** '+this.centroSeleccionadoID+' - - - - - - - - - ');
        this.setter(this.centroSeleccionadoID)
        // this.setCanvasImage()
      });

    })

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
    console.log("lll " + this.centroSeleccionadoID +''+ this.centro.id)
    // this.canvas.saveCanvasToDB(this.centroSeleccionadoID);

this.CanvasFactory.saveCanvasToBD(this.centroSeleccionadoID)
  }
//TODO: seleccionadoID no se actualiza en el subscribe
  public setter(data){

    console.log('lll '+ data)
    this._selecID = data
    const id = data
    console.log('lll '+ this._selecID)
    this._selecID = id
    console.log('lll '+ this._selecID)

  }

  public gettter(){
    console.log('lll 2 '+ this._selecID)
  }
  public setCanvasImage(): void {
    this.CanvasFactory.setCanvasImageParam(this.canvasImage)
    // this.comunicadorService.enviarMensajeCanvasImage(this.canvasImage);
  }

  mostrarCentros() {
    this.comunicadorService.enviarMostrar(false)
  }
}
