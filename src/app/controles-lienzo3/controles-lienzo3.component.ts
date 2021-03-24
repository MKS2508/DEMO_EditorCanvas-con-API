import { Component, OnInit, ViewChild } from "@angular/core";
import { EditorLienzoComponent } from "../editor-lienzo/editor-lienzo.component";
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from "../canvas.service";
import * as fabric from "fabric/fabric-impl";
import { ComunicadorService } from "../comunicador.service";
import { CanvasFactory } from "../canvas-factory";
import { CanvasProps } from "../CanvasProps";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
@Component({
  selector: "app-controles-lienzo3",
  templateUrl: "./controles-lienzo3.component.html",
  styleUrls: ["./controles-lienzo3.component.scss"],
})
export class ControlesLienzo3Component implements OnInit {
  public lienzos = []; //lista objetos

  constructor(
    private lienzoService: CanvasService,
    private comunicadorService: ComunicadorService
  ) {
  }

  canvas: fabric.Canvas;
  size: any;
  CanvasFactory: CanvasFactory;
  selected: fabric.Object;

  id;
  nombre;
  opacity;
  fill;

  ngOnInit(): void {
    // this.comunicadorService.enviarCanvasObservable.subscribe(data => {console.warn(data), this.canvas = data})
    // this.comunicadorService.enviarSelectedObservable.subscribe(data => {console.warn("SELECCIONADO EN CONTROLES"+data.opacity), this.selected = data})
    // this.comunicadorService.enviarIDObs.subscribe(data => {console.warn("ID EN CONTROLES: "+data),this.id = data, this.setIDparam(data)})
    // this.comunicadorService.enviarNombreObs.subscribe(data => {console.warn("NAME EN CONTROLES:" + data), this.nombre = data, this.setNameParam(data)})
    // this.comunicadorService.enviarFillObs.subscribe(data => {console.warn("FILL EN CONTROLES:" + data), this.fill = data, this.setFillParam(data)})
    // this.comunicadorService.enviarOpacityObs.subscribe(data => {console.warn("OPACITY EN CONTROLES:" + data), this.opacity = data, this.setOpacityParam(data)})
  }
}
//
//
//   setOpacityParam(value: number){
//     this.props.opacity = 1;
//     console.error("OPACITY PROPS "+this.props.opacity)
//   }
//   setFillParam(value: string){
//     this.props.fill = value;
//     console.error("FILL PROPS "+this.props.fill)
//
//   }
//   setNameParam(value: string){
//     console.error("NAME PROPS "+this.props.nombre)
//     this.props.nombre = value;
//   }
//   setIDparam(value: number){
//     console.error("id PROPS "+this.props.id)
//     this.props.id = value;
//   }
//   public props: CanvasProps = { // obj canvas
//     canvasFill: '#ffffff',
//     canvasImage: '',
//     id: 10,
//     nombre: null,
//     opacity: null,
//     fill: null,
//   };
//
//   public setId(): void {
//     this.comunicadorService.enviarMensajeID(this.props.id)
//   }
//
//   public setOpacity(): void {
//     this.comunicadorService.enviarMensajeOpacity(1)
//   }
//
//   public setName(): void {
//     this.comunicadorService.enviarMensajeNombre(this.props.nombre)
//   }
//
//   public setFill(): void {
//     this.comunicadorService.enviarMensajeFill(this.props.fill);
//   }
// }
