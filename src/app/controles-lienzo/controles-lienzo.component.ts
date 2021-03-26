import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { fabric } from 'fabric';

import { ObjProps } from "../obj-props";

import { CanvasProps } from '../CanvasProps';
import { CanvasService } from '../canvas.service';
import { ComunicadorService } from '../comunicador.service';
import { EditorLienzoComponent } from '../editor-lienzo/editor-lienzo.component';
import { CanvasFactory } from '../canvas-factory';
import {CentroProps} from "../centro-props";
@Component({
  selector: 'app-controles-lienzo',
  templateUrl: './controles-lienzo.component.html',
  styleUrls: ['./controles-lienzo.component.scss']
})
export class ControlesLienzoComponent implements OnInit {
  // @ViewChild("canvas", { static: false }) htmlCanvas: EditorLienzoComponent;



  public lienzos = []; //lista objetos
  private centro: CentroProps = {
    aulas: [], canvasImage: "", height: 2000, id: 0, idCTRSede: "", width: 2000

  };
public EditorLienzoComponent: EditorLienzoComponent
canvas: fabric.Canvas;
size: any;
CanvasFactory: CanvasFactory;
selected: fabric.Object
  ancho:number
  private centroSeleccionadoID: number = 777;
  ngOnInit(): void {
    this.ancho = 0
  this.size = {
    width: 1000,
    height: 800
  }
    this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService);
    console.warn(this.canvas)
    console.log(this.lienzos.length)
    this.comunicadorService.recibirCanvasObs.subscribe(data =>
    {

      console.error(data)
      this.canvas = data;
      this.selected = data.getActiveObject();
    })

    this.comunicadorService.recibirCentroObs.subscribe(data => {
      this.centroSeleccionadoID = data
      this.lienzoService.getCentro(this.centroSeleccionadoID).subscribe(data => {
        console.log("1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 "+data.width)
        this.size.width = data.width
        this.ancho = data.width
        // console.log('IDCENTRO '+' ****** '+data.id+' - - - - - - - - - '+data.aulas[0].idCTRCentro);
        this.lienzos = data.aulas;
        this.centro = data;

        for (let i = 0; i <= this.lienzos.length - 1; i++) {
          this.lienzos[i].idCTRCentro = this.centroSeleccionadoID;

        }
        // console.log('IDCENTRO '+' ****** '+data.id+' - - - - - -'+' -  '+this.centro.canvasImage+  '- '+' - - - '+data.aulas[0].idCTRCentro);
        this.props.canvasImage = this.centro.canvasImage


        this.canvas.setWidth(this.centro.width);
        this.canvas.setHeight(this.centro.height)

        this.changeSize()
            this.CanvasFactory.loadCanvasFromMocks(this.lienzos, this.centro);

        // this.size.width = 1
        //
        // this.size.height = this.centro.height
      });

    })
    this.changeSize()

  }


  changeSize(){

this.canvas.setWidth(this.size.width)
this.canvas.setHeight(this.size.height);
    console.log('tamanio'+this.canvas.getWidth())
    this.size.width = this.ancho
    this.size.height = this.canvas.getHeight()

    this.comunicadorService.enviarCanvas(this.canvas)
}

  addFigure(){
this.CanvasFactory.addFigure()
}


  deleteAll(){
    this.CanvasFactory.confirmClear();

  this.comunicadorService.enviarCanvas(this.canvas)
}

  removeSelected(){

    console.error("remove")
    this.CanvasFactory.removeSelected()
  }

  sendToBack(){
    this.CanvasFactory.sendToBack()
  }

  bringToFront(){
    this.CanvasFactory.bringToFront()
  }

  clone(){
    this.CanvasFactory.clone()
  }

  cleanSelect(){
    this.canvas.discardActiveObject().renderAll();
    this.CanvasFactory.cleanSelect()
  }
  mensaje:String;


  public props: CanvasProps = { // obj canvas
    canvasFill: '#ffffff',
    canvasImage: '',
    id: 1,
    nombre: null,
    opacity: null,
    fill: null,
    idCTRCentro:''
  };

  private objeto1: ObjProps = { //objBD
    id: 0,
    nombre: 'a',
    lienzo: '',
    width: 0,
    height: 0,
    left_canvas: 0,
    top_canvas: 0,
    angle: 0,
    fill: '#ffffff',
    opacity: 0,
    idCTRCentro:'',

    scaleX: 1,
    scaleY:1
  }


  constructor(private lienzoService : CanvasService, private ref: ChangeDetectorRef, private comunicadorService: ComunicadorService){}

}
