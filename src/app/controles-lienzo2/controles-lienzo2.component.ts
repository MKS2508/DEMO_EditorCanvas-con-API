import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorLienzoComponent } from '../../app/editor-lienzo/editor-lienzo.component';
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from "../../app/canvas.service";
import { ComunicadorService } from "../comunicador.service";
import { CanvasFactory } from "../canvas-factory";
import {CentroProps} from "../centro-props";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-controles-lienzo2',
  templateUrl: './controles-lienzo2.component.html',
  styleUrls: ['./controles-lienzo2.component.scss'],
})
export class ControlesLienzo2Component implements OnInit {

  subscription1: Subscription;
  public lienzos = []; // lista objetos
  private centro: CentroProps = {
    aulas: [], canvasImage: '', height: 2000, id: 0, idCTRSede: '', width: 2000

  };
  private centroSeleccionadoID: number = 777;
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
  sape: string
  CanvasFactory: CanvasFactory;
  selected: fabric.Object;
  canvasImage: string = '';

  listaValores: Array<number>=[]

  ngOnInit(): void {
    this.editorCanvas = false  ;
    this.comunicadorService.recibirEditorObs.subscribe(data => {
      if (data === true) {
        this.editorCanvas = true;
      } else {
        this.editorCanvas = false;
      }
    });

    this.sape = 'und'
    this.centroSeleccionadoID =777

      this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService)
    this.comunicadorService.recibirCanvasObs.subscribe(data => {console.warn(data), this.canvas = data})

   this.subscription1 =  this.comunicadorService.recibirCentroObs.subscribe(data => {
      this.centroSeleccionadoID = data;
        console.log('IDCENTRO '+' ****** '+data+' - - - - - - - - - ');
      this.lienzoService.getCentro(data).subscribe(data2 =>
      {
        this.centro = data2;

        this.lienzos = this.centro.aulas;

        console.log('IDCENTRO '+' ****** '+data2.id+' - - - - - - - - - '+this.centroSeleccionadoID);
        this.sape='id '+this.centroSeleccionadoID
        for (let i = 0; i <= this.lienzos.length - 1; i++) {
          this.lienzos[i].idCTRCentro = data2.id;

        }
        this.listaValores.push(data2.id);
        this.listaValores.push(data2.id+22);

        // console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
        this.canvasImage = this.centro.canvasImage
        console.log('IDCENTRO '+' ****** '+this.sape+' - - - - - - - - - ');
        // this.setter(this.centroSeleccionadoID)
        // this.setCanvasImage()
      });
      // this.comunicadorService.enviarCentro(this.centroSeleccionadoID)
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
    // this.centroSeleccionadoID = this.listaValores[0]
    console.log("lll " + this.centroSeleccionadoID +''+ this.centro.id)
    // this.canvas.saveCanvasToDB(this.centroSeleccionadoID);

this.CanvasFactory.saveCanvasToBD(this.centroSeleccionadoID)
  }
//TODO: seleccionadoID no se actualiza en el subscribe
  editorCanvas: boolean;
  public setter(data){

    console.log('lll '+ data)
    this._selecID = data
    const id = data
    console.log('lll '+ this._selecID)
    this._selecID = id
    console.log('lll '+ this._selecID)

  }

  public gettter(){

    // this.subscription1.unsubscribe();
      console.log('IDCENTRO DEF 1'+ this.sape+'')
    console.log('IDCENTRO DEF 2'+ this.centroSeleccionadoID)
console.log('IDCENTRO'+this.listaValores)
    console.log('IDCENTRO'+this.listaValores[0])

  }
  public setCanvasImage(): void {
    this.CanvasFactory.setCanvasImageParam(this.canvasImage)
    // this.comunicadorService.enviarMensajeCanvasImage(this.canvasImage);
  }

  mostrarCentros() {
    this.comunicadorService.enviarMostrar(false)
  }
}
