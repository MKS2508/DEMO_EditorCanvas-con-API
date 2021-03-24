import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { fabric } from 'fabric';

import { ObjProps } from "src/app/obj-props";

import { CanvasProps } from 'src/app/CanvasProps';
import { CanvasService } from 'src/app/canvas.service';
import { ComunicadorService } from 'src/app/comunicador.service';
import { EditorLienzoComponent } from '../editor-lienzo/editor-lienzo.component';
import { CanvasFactory } from '../canvas-factory';
@Component({
  selector: 'app-controles-lienzo',
  templateUrl: './controles-lienzo.component.html',
  styleUrls: ['./controles-lienzo.component.scss']
})
export class ControlesLienzoComponent implements OnInit {
  // @ViewChild("canvas", { static: false }) htmlCanvas: EditorLienzoComponent;


  public lienzos = []; //lista objetos 

public EditorLienzoComponent: EditorLienzoComponent
canvas: fabric.Canvas;
size: any;
CanvasFactory: CanvasFactory;
selected: fabric.Object
  ngOnInit(): void {
    this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService);
    console.warn(this.canvas)
    this.lienzoService.getLienzos().subscribe(data => {this.lienzos = data, console.log(data)});
    console.log(this.lienzos.length)
    this.comunicadorService.enviarSizeObservable.subscribe(data => {console.warn(data.width + "AAAAAAAAAAA"), this.size = data});
    this.comunicadorService.enviarCanvasObservable.subscribe(data => {console.warn(data), this.canvas = data})
    this.comunicadorService.enviarSelectedObservable.subscribe(data => {console.warn(data), this.selected = data})
  }

  cambioTexto(){
    this.comunicadorService.enviarMensaje("ADDED");
  }

  cambioTexto2(){
    this.comunicadorService.enviarMensaje("MENSAJE2");
  }

  changeSize(){
    this.comunicadorService.enviarMensajeSize(this.size)
  }
  
  addFigure(){
    this.comunicadorService.enviarMensaje("ADDED");
  }


  deleteAll(){
    this.comunicadorService.enviarMensajeDeleteAll();
  }

  removeSelected(){
    this.comunicadorService.enviarMensajeDelete();
  }

  sendToBack(){
    this.comunicadorService.enviarMensajeBringTo(true)
  }

  bringToFront(){
    this.comunicadorService.enviarMensajeBringTo(false)
  }

  clone(){
    this.comunicadorService.enviarMensajeClone("CLONED")
  }

  cleanSelect(){
    this.comunicadorService.enviarMensajeUnselect("UNSELECTED")
  }
  mensaje:String;

  public props: CanvasProps = { // obj canvas
    canvasFill: '#ffffff',
    canvasImage: '',
    id: 1,
    nombre: null,
    opacity: null,
    fill: null,
  };


  constructor(private lienzoService : CanvasService, private ref: ChangeDetectorRef, private comunicadorService: ComunicadorService){}

}