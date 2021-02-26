import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { fabric } from 'fabric';

import { ObjProps } from "src/app/obj-props";

import { CanvasProps } from 'src/app/CanvasProps';
import { CanvasService } from 'src/app/canvas.service';

@Component({
  selector: 'angular-editor-fabric-js',
  templateUrl: './angular-editor-fabric-js.component.html',
  styleUrls: ['./angular-editor-fabric-js.component.css'],
})

export class FabricjsEditorComponent implements AfterViewInit {
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;

  private canvas: fabric.Canvas;

  public props: CanvasProps = { // obj canvas
    canvasFill: '#ffffff',
    canvasImage: '',
    id: 1,
    nombre: null,
    opacity: null,
    fill: null,
  };

  private objeto1: ObjProps = { //objBD
    id: 0,
    nombre: 'a',
    lienzo: '',
    width: 0,
    height:0,
    left_canvas:0,
    top_canvas:0,
    angle:0,
    fill:'#ffffff',
    opacity:0, 
    canvasImage:'', 
    cnvIMG: ''
  }

  public url: string | ArrayBuffer = '';
  public size: any = {
    width: 1140,
    height: 800
  };

  public textEditor: boolean = false;
  public figureEditor: boolean = false;
  
  public selected: fabric.Object;

  constructor(private _lienzoService : CanvasService, private ref: ChangeDetectorRef){}

  ngAfterViewInit(): void {

    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue'
    });

    this.canvas.on({
      'object:moving': (e) => { },
      'object:modified': (e) => { },
      'object:selected': (e) => {
        const selectedObject = e.target;
        this.selected = selectedObject;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        selectedObject.cornerColor = 'red';

        this.resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {

          this.getId();
          this.getOpacity();
        }
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

  }

  changeSize(): void { // tamanio canvas
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  addFigure(): void { // agregar rectangulo nuevo
    let add: any;
      add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '#3f51b5'
      });
    var randomizedId: number = this.randomId();
    this.extend(add, randomizedId, 'a'+randomizedId, this.props.canvasImage);
    this.canvas.add(add);
    this.selectItemAfterAdded(add);
    console.log("ADDFIG "+ this.props.canvasImage);
  }

  addFigureParam ( // agregar figura guardada
    idParam:number,
    nombreParam:string,
    widthParam:number,
    heightParam:number,
    leftParam:number,
    topParam:number,
    angleParam:number,
    fillParam:string,
    opacityParam:number,
    canvImageParam:string
  ): void {
    let add: any;
  
    var rect = new fabric.Rect({
      width: widthParam,
      height: heightParam,
      left: leftParam,
      top: topParam,
      angle: angleParam,
      fill: fillParam,
      opacity: opacityParam,
    });
  
    this.extend(rect, idParam, nombreParam, canvImageParam);
  
    this.canvas.add(rect);
    this.canvas.renderAll();
    this.setCanvasImage();
    this.selectItemAfterAdded(rect);
  }

  cleanSelect(): void {
    this.canvas.discardActiveObject().renderAll();
  } //des-seleccion

  selectItemAfterAdded(obj):void {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }//se utiliza despues de pintar un obj

  setCanvasFill(): void {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  } // color relleno

  extend(obj:any, id:number, nombre: string, cnvIMG:string): void{
    obj.toObject = (function (toObject): any {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id,
          nombre: nombre,
          cnvIMG: cnvIMG
        });
      };
    })(obj.toObject);
    obj.id = id;
    obj.nombre = nombre;
    cnvIMG = this.props.canvasImage;
    obj.cnvIMG = cnvIMG;
  } // este metodo extiende el objeto del canvas con los parametros extra (ID, name...)

  setCanvasImage(): void{
    const self = this;
    if (this.props.canvasImage) {
      this.canvas.setBackgroundColor(new fabric.Pattern({ source: this.props.canvasImage, repeat: 'repeat' }), () => {
        self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    }
    this.canvas.renderAll();
    console.log("CANVASIMG " +this.props.canvasImage);
    this.canvas.setWidth(0);
    this.canvas.setWidth(1140);
    this.ref.detectChanges()
  } // este metodo settea la imagen de fondo del lienzo
  
  setCanvasImageParam(cnvImg: string): void{
    const self = this;
 
      this.canvas.setBackgroundColor(new fabric.Pattern({ source: cnvImg, repeat: 'repeat' }), () => {
        self.props.canvasFill = '';
        self.canvas.renderAll();
      });
    this.props.canvasImage = cnvImg;
    this.canvas.renderAll();
    console.log("CANVASIMG");
    this.canvas.setWidth(0);
    this.canvas.setWidth(1140);
  } // este metodo settea la imagen de fondo del lienzo, cuando la recuperamos de BD

  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  } // genera id aleatorio
  
//getter y setter estilo canvas
  getActiveStyle(styleName, object): any {
    object = object || this.canvas.getActiveObject();
    if (!object) { return ''; }

    if (object.getSelectionStyles && object.isEditing) {
      return (object.getSelectionStyles()[styleName] || '');
    } else {
      return (object[styleName] || '');
    }
  }

  setActiveStyle(styleName, value: string | number, object: fabric.IText):void  {
    object = object || this.canvas.getActiveObject() as fabric.IText;
    if (!object) { return; }

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
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }
//getter y setter
  getId(): void{
    console.log('SIZE DEL CANVAS :'+this.canvas.size());
    this.props.id = this.canvas.getActiveObject().toObject().id;
    this.props.nombre = this.canvas.getActiveObject().toObject().nombre;
    console.log("GET ID ACTIVADO 2 -->" + this.props.id);
    console.log("GET NOMBRE ACTIVADO 2 -->" + this.props.nombre);
  }
  
  setId(): void{
    const valID:number = this.props.id;
    const valNombre:string = this.props.nombre;
    const valcnv:string = this.props.canvasImage;
    const complete = this.canvas.getActiveObject().toObject(["id", "nombre","cnvIMG"]);
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = valID;
      complete.nombre = valNombre;
      complete.cnvIMG =  valcnv;
      return complete;
    };
  }

  getOpacity():void {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity():void {
    this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
  }

  getFill():void {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill():void {
    this.setActiveStyle('fill', this.props.fill, null);
  }

  removeSelected():void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();
    const activeId = this.canvas.getActiveObject().toDatalessObject(["id","nombre","CNVIMG"]).id;
    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
   this.deleteCanvasFromDB(activeId);
  } // eliminar bd el seleccionado

  bringToFront():void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  }//traer figura al frente, superponer encima de otra

  sendToBack(): void{
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.sendToBack(activeObject);
      activeObject.sendToBack();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  }// el contrario del metodo anterior

  confirmClear():void {
    if (confirm('Se va a eliminar el lienzo')) {
      this.canvas.clear();
    }
  }
  //limpia el lienzo entero, no los borra de la bd

  resetPanels():void {
    this.figureEditor = false;
  }

  private objeto2: ObjProps = { //objFind
    id: 0,
    nombre: 'a',
    lienzo: '',
    width: 0,
    height:0,
    left_canvas:0,
    top_canvas:0,
    angle:0,
    fill:'#ffffff',
    opacity:0, 
    canvasImage:'',
    cnvIMG:''
  }

  findByID(id: string): boolean {
    console.log("OBJETO FIND "+id)
    this._lienzoService.findLienzo(id).subscribe(data => this.objeto2 = data);
    console.log("OBJETO FIND "+this.objeto2.id + "DATA "+ this.objeto2.id);
    if (this.objeto2.id != 0){
      return true;
    } else {
      return false;
    }
  } // encontrar por id, comprobar si existe

  saveCanvasToDB(): void{

    var sizeCanvas = this.canvas.size();
    let arrayProps = [];
  
    // this.canvas.clear();
    for (var i = 0; i <= sizeCanvas - 1; i++) {
      var item = this.canvas.item(i).toDatalessObject(["id", "nombre","cnvIMG"]);
      item.canvasImage = item.cnvIMG;
      console.log("MEDIO "+item.canvasImage);
      if(this.findByID(item.id) === true){//si el canvas existe, actualiza, si se cambia el id, borra y pinta
        this.updateCanvasFromDB(item);
        console.log("EXISTE, ACTUALIZANDO")
      } else{
        this._lienzoService.postLienzo(item).subscribe(data => console.log(data));
        console.log("NO EXISTE, CREANDO")

      }
    }
    
  }//guardar en bd

  deleteCanvasFromDB(id:number): void{

      this._lienzoService.deleteLienzo(id).subscribe(data => console.log("OBJETO CON ID: "+id + "ELIMINADO DE LA BD ----- "+data)); 

  } //eliminar elemento de la bd, se llama desde removeSelected

  updateCanvasFromDB(Object:ObjProps): void{
    this._lienzoService.updateLienzo(Object).subscribe(data => console.log("OBJETO CON ID: "+Object.id + "ACTUALIZADO DE LA BD ----- "+data)); 
} // update
  
  
  loadCanvasFromMocks(mock: ObjProps[]):void {

    var longitudObjetos = mock.length;
    this.confirmClear();

    for (var i = 0; i <= longitudObjetos - 1; i++) {
        this.addFigureParam(
        mock[i].id,
        mock[i].nombre,
        mock[i].width,
        mock[i].height,
        mock[i].left_canvas,
        mock[i].top_canvas,
        mock[i].angle,
        mock[i].fill,
        mock[i].opacity,
        mock[i].canvasImage
        
      );
      console.log('cnvimg'+mock[i].canvasImage);
      this.canvas.item(0).toDatalessObject().canvasImage = mock[i].canvasImage ;
      console.log('cnvimg'+this.canvas.item(0).toDatalessObject().canvasImage);
      this.setCanvasImageParam(mock[i].canvasImage);
      this.props.canvasImage = mock[i].canvasImage;
      console.log('propsIMG  '+this.props.canvasImage);
      this.setCanvasImage();
      this.canvas.renderAll();
      this.selectItemAfterAdded(this.canvas.item(0));
    }    
    this.canvas.setWidth(0);
    this.canvas.setWidth(1140);
    this.ref.detectChanges()
  } // cargar desde bd
}