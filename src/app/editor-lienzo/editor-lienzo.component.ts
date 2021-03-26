import {Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnInit} from '@angular/core';
import { fabric } from 'fabric';

import { ObjProps } from "../obj-props";

import { CanvasProps } from '../CanvasProps';
import { CanvasService } from '../canvas.service';
import {CentroProps} from "../centro-props";
import { CanvasFactory } from "../canvas-factory";
import {ComunicadorService} from "../comunicador.service";

@Component({
  selector: 'app-editor-lienzo',
  templateUrl: './editor-lienzo.component.html',
  styleUrls: ['./editor-lienzo.component.scss'],
})
export class EditorLienzoComponent implements AfterViewInit, OnInit {


  ngOnInit(): void {

this.comunicadorService.recibirCanvasObs.subscribe(data => {
  this.canvas = data;
  console.warn("Canvas recibido en editorLienzo: "+'/n'+this.canvas)
  this.selected = this.canvas.getActiveObject()

});    }

  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;



  public canvas: fabric.Canvas;
  CanvasFactory: CanvasFactory = new CanvasFactory(this._lienzoService, this.comunicadorService);

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

  private objCentro: CentroProps;

  public url: string | ArrayBuffer = '';
  public size: any = {
    width: 1140,
    height: 800
  };

  public textEditor: boolean = false;
  public figureEditor: boolean = false;

  public selected: fabric.Object;

  constructor(private _lienzoService: CanvasService, private ref: ChangeDetectorRef, private comunicadorService: ComunicadorService) {
  }

  ngAfterViewInit(): void {

    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    this.canvas.on({
      'object:moving': (e) => {
      },
      'object:modified': (e) => {
        const selectedObject = e.target;
        this.selected = selectedObject;
        console.warn(selectedObject.toObject())


      },
      'object:selected': (e) => {
        const selectedObject = e.target;
        this.selected = selectedObject;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        selectedObject.cornerColor = 'red';
        console.log(selectedObject.toObject())
        let obj: ObjProps = {
          angle: 0,
          fill: "",
          height: 0,
          id: 0,
          idCTRCentro: "",
          left_canvas: 0,
          lienzo: "",
          nombre: "",
          opacity: 0,
          scaleX: 0,
          scaleY: 0,
          top_canvas: 0,
          width: 0

        }
        obj.id = selectedObject.toObject().id
        obj.nombre = selectedObject.toObject().nombre
        obj.opacity = selectedObject.toObject().opacity
        obj.fill= selectedObject.toObject().fill

        //enviar selected
        this.comunicadorService.enviarSelected(obj)
        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();
          console.warn(selectedObject.toObject().width)
        }

        this.comunicadorService.enviarCanvas(this.canvas)
      },
      'selection:cleared': (e) => {
        this.selected = null;
        this.resetPanels();

      }
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
    this.setCanvasImage();
    // get references to the html canvas element & its context
    this.canvas.on('mouse:down', (e) => {
      const canvasElement: any = document.getElementById('canvas');
    });
    //enviar el canvas
    this.comunicadorService.enviarCanvas(this.canvas);
  }

  changeSize(): void { // tamanio canvas
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  addFigure(): void { // agregar rectangulo nuevo
    // agregar rectangulo nuevo
    this.CanvasFactory.addFigure();
  }

  addFigureParam(objProps: ObjProps
  ): void {
 this.CanvasFactory.addFigureParam(objProps)
  }

  cleanSelect(): void {
    this.canvas.discardActiveObject().renderAll();
  } //des-seleccion

  selectItemAfterAdded(obj): void {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }//se utiliza despues de pintar un obj

  setCanvasFill(): void {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  } // color relleno

  extend(obj: any, id: number, nombre: string, idCTRCentro: string): void {
    obj.toObject = (function (toObject): any {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id,
          nombre: nombre,
          idCTRCentro: idCTRCentro
        });
      };
    })(obj.toObject);
    obj.id = id;
    obj.nombre = nombre;
    idCTRCentro = this.props.idCTRCentro;
  } // este metodo extiende el objeto del canvas con los parametros extra (ID, name...)

  setCanvasImage(): void {
    const self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor(
        new fabric.Pattern({
          source: this.props.canvasImage,
          repeat: "repeat",
        }),
        () => {
          self.props.canvasFill = "";
          self.canvas.renderAll();
        }
      );
    }
    this.canvas.renderAll();
    console.log("CANVASIMG " + this.props.canvasImage);
    this.canvas.setWidth(0);
    this.canvas.setWidth(1140);


    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);  } // este metodo settea la imagen de fondo del lienzo

  setCanvasImageParam(cnvImg: string): void {
    const self = this;

    this.canvas.setBackgroundColor(new fabric.Pattern({source: cnvImg, repeat: 'repeat'}), () => {
      self.props.canvasFill = '';
      self.canvas.renderAll();
    });
    this.props.canvasImage = cnvImg;
    this.canvas.renderAll();
    console.log("CANVASIMG");

  } // este metodo settea la imagen de fondo del lienzo, cuando la recuperamos de BD

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  } // genera id aleatorio

//getter y setter estilo canvas
  getActiveStyle(styleName, object): any {
    object = object || this.canvas.getActiveObject();
    if (!object) {
      return '';
    }

    if (object.getSelectionStyles && object.isEditing) {
      return (object.getSelectionStyles()[styleName] || '');
    } else {
      return (object[styleName] || '');
    }
  }

  setActiveStyle(styleName, value: string | number, object: fabric.IText): void {
    object = object || this.canvas.getActiveObject() as fabric.IText;
    if (!object) {
      return;
    }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;

      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.setSelectionStyles({underline: true});
        } else {
          object.setSelectionStyles({underline: false});
        }

        if (value.includes('overline')) {
          object.setSelectionStyles({overline: true});
        } else {
          object.setSelectionStyles({overline: false});
        }

        if (value.includes('line-through')) {
          object.setSelectionStyles({linethrough: true});
        } else {
          object.setSelectionStyles({linethrough: false});
        }
      }

      object.setSelectionStyles(style);
      object.setCoords();

    } else {
      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.set('underline', true);
        } else {
          object.set('underline', false);
        }

        if (value.includes('overline')) {
          object.set('overline', true);
        } else {
          object.set('overline', false);
        }

        if (value.includes('line-through')) {
          object.set('linethrough', true);
        } else {
          object.set('linethrough', false);
        }
      }

      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }

//clonar obj
  clone(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({left: 10, top: 10});
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

//getter y setter
  getId(): void {
    console.log('SIZE DEL CANVAS :' + this.canvas.size());
    this.props.id = this.canvas.getActiveObject().toObject().id;
    this.props.nombre = this.canvas.getActiveObject().toObject().nombre;
    console.warn(this.canvas.getActiveObject().toObject().width)

    console.log("GET ID ACTIVADO 2 -->" + this.props.id);
    console.log("GET NOMBRE ACTIVADO 2 -->" + this.props.nombre);
  }

  setId(): void {
    const valID: number = this.props.id;
    const valNombre: string = this.props.nombre;
    const complete = this.canvas.getActiveObject().toObject(["id", "nombre"]);
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = valID;
      complete.nombre = valNombre;
      return complete;
    };
  }

  getOpacity(): void {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  //limpia el lienzo entero, no los borra de la bd

  resetPanels(): void {
    this.figureEditor = false;
  }

  private objeto2: ObjProps = { //objFind
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
    scaleY: 1
  }

  findByID(id: string): boolean {
    console.log("OBJETO FIND " + id)
    this._lienzoService.findLienzo(id).subscribe(data => this.objeto2 = data);
    console.log("OBJETO FIND " + this.objeto2.id + "DATA " + this.objeto2.id);
    if (this.objeto2.id != 0) {
      return true;
    } else {
      return false;
    }
  } // encontrar por id, comprobar si existe
  saveCanvasToDB(): void{

  this.CanvasFactory.saveCanvasToBD()

  }

  deleteCanvasFromDB(id:number): void{

      this._lienzoService.deleteLienzo(id).subscribe(data => console.log("OBJETO CON ID: "+id + "ELIMINADO DE LA BD ----- "+data));

  } //eliminar elemento de la bd, se llama desde removeSelected




  loadCanvasFromMocks(mock: ObjProps[], centro: CentroProps):void {
  this.CanvasFactory.loadCanvasFromMocks(mock, centro)
  }
}
