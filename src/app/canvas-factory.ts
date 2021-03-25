import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { fabric } from "fabric";

import { ObjProps } from "./obj-props";

import { CanvasProps } from "./CanvasProps";
import { CanvasService } from "./canvas.service";
import { EditorLienzoComponent } from "./editor-lienzo/editor-lienzo.component";
import { ComunicadorService } from "./comunicador.service";
import {CentroProps} from "./centro-props";

export class CanvasFactory implements OnInit {

  public centro: CentroProps = {
    aulas: [], canvasImage: "", height: 1000, id: 0, idCTRSede: "", width: 100

  }

  public canvas: fabric.Canvas;
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef;
  editorlienzo:EditorLienzoComponent;
  public size: any;
  public props: CanvasProps = {
    // obj canvas
    canvasFill: "#ffffff",
    canvasImage: "",
    id: 1,
    nombre: null,
    opacity: null,
    fill: null,
    idCTRCentro:"999"
  };

  seleccionado: String = "object:selected";
  movimiento: String = "object:moving";

  public arrayProps: ObjProps[] = []
  public objetoBD: ObjProps = {
    //objBD
    id: 0,
    nombre: "a",
    lienzo: "",
    width: 0,
    height: 0,
    left_canvas: 0,
    top_canvas: 0,
    angle: 0,
    fill: "#ffffff",
    opacity: 0,
    scaleY:1,
    scaleX:1,
    idCTRCentro:'999'
  };

  private objetoEncontrado: ObjProps = {
    //objFind
    //objBD
    id: 0,
    nombre: "a",
    lienzo: "",
    width: 0,
    height: 0,
    left_canvas: 0,
    top_canvas: 0,
    angle: 0,
    fill: "#ffffff",
    opacity: 0,
    scaleY:1,
    scaleX:1,
    idCTRCentro:'999'
  };
  public selected: fabric.Object;
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
  private objCentro: CentroProps = {
    aulas: [], canvasImage: "", height: 1000, id: 0, idCTRSede: "888", width: 1000


  };
  constructor(private lienzoService: CanvasService, private comunicadorService: ComunicadorService) {

      this.size = {
      width: 1140,
      height: 800,
    };
    console.warn(this.canvas)



    this.comunicadorService.recibirCanvasObs.subscribe(data => {
      this.canvas = data;
      console.warn(data)
      this.selected = this.canvas.getActiveObject();

      this.arrayProps = [];
      for(var i = 0; i <=       this.canvas.size()-1; i++){
          // this.objetoBD = null;

        console.log(data._objects[i].toObject())
        this.objetoBD.id = data._objects[i].toObject().id;
        console.log(this.objetoBD)

        this.objetoBD.nombre = data._objects[i].toObject().nombre;
        this.objetoBD.width = data._objects[i].toObject().width;

        this.objetoBD.height = data._objects[i].toObject().height;
        this.objetoBD.scaleX = data._objects[i].toObject().scaleX;
        this.objetoBD.scaleY =  data._objects[i].toObject().scaleY;
        this.objetoBD.idCTRCentro  =  data._objects[i].toObject().idCTRCentro;
        this.objetoBD.angle  =  data._objects[i].toObject().angle;
        this.objetoBD.fill   =  data._objects[i].toObject().fill;
        this.objetoBD.opacity  =  data._objects[i].toObject().opacity;
        this.objetoBD.left_canvas  =  data._objects[i].toObject().left;
        this.objetoBD.top_canvas  =  data._objects[i].toObject().top;
        let clone = {...this.objetoBD};

        this.arrayProps.push(clone)
        this.arrayProps.length

        console.log('---------------------------------------'+         this.arrayProps.length
        )

        // this.objetoBD.id = this.canvas.
      }
    });    }
  ngOnInit(): void {
    console.log("FUNCIONA")
  }

  /**
   * Agrega una figura basica al canvas, sin parametros
   *
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.addFigure();
   * ```
   */
  public addFigure(): void {
    // agregar rectangulo nuevo
    let add: any;
    add = new fabric.Rect({
      width: 200,
      height: 100,
      left: 10,
      top: 10,
      angle: 0,
      fill: "#3f51b5",
    });
    let randomizedId: number = this.randomId();
    this.extend(add, randomizedId, "a" + randomizedId, this.props.canvasImage);
    this.canvas.add(add);
    // this.selectItemAfterAdded(add);
    console.log("ADDFIG " + this.props.canvasImage);

    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);
  }

  loadCanvasFromMocks(mock: ObjProps[], centro: CentroProps):void {

    var longitudObjetos = mock.length;
    this.confirmClear();

    for (var i = 0; i <= longitudObjetos - 1; i++) {
      this.addFigureParam(
        mock[i]

      );
      this.setCanvasImageParam(centro.canvasImage);
      this.setCanvasImage();
      this.canvas.renderAll();
      this.selectItemAfterAdded(this.canvas.item(0));

    }
    console.log(centro.width +' - - '+ this.size.width)
    this.size.width = centro.width;
    this.size.height = centro.height;
    console.log(centro.width +' - - '+ this.size.width)
    this.canvas.setWidth(centro.height);
    this.setCanvasImageParam(centro.canvasImage);
    this.objCentro = centro;
    console.error(centro.aulas)
    console.error(this.objCentro.aulas)
    this.comunicadorService.enviarCanvas(this.canvas)
  } // cargar desde bd



  /**
   * Extiende el objeto del canvas con los parametros extra (ID, name...)
   *
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.extend(obj:any, id:number, nombre: string, cnvIMG:string)
   * ```
   */
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

    this.comunicadorService.enviarCanvas(this.canvas);

  } // este metodo extiende el objeto del canvas con los parametros extra (ID, name...)

  /**
   * Se utiliza despues de pintar un objeto, selecciona el objeto recien pintado
   *
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.selectItemAfterAdded(obj)
   * ```
   */
  selectItemAfterAdded(obj): void {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }

  /**
   * Genera un Identificador aleatorio para un objeto
   *
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.randomId();
   * ```
   */
  randomId(): number {
    return Math.floor(Math.random() * 999999) + 1;
  } // genera id aleatorio

  /**
   *  Agrega una figura basica al canvas, con parametros.
   *  Se utiliza para pintar los objetos recuperados de la BD
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.addFigureParam(objeto)
   * ```
   */
  addFigureParam(Objeto: ObjProps): void {
    let add: any;

    // agregar figura guardada
    let idParam: number = Objeto.id;
    let nombreParam: string = Objeto.nombre;
    let widthParam: number = Objeto.width;
    let heightParam: number = Objeto.height;
    let leftParam: number = Objeto.left_canvas;
    let topParam: number = Objeto.top_canvas;
    let angleParam: number = Objeto.angle;
    let fillParam: string = Objeto.fill;
    let opacityParam: number = Objeto.opacity;
    let scaleXparam:number = Objeto.scaleX;
    let scaleYparam:number = Objeto.scaleY;
    let idCTRCentroparam:string = Objeto.idCTRCentro

    let rect = new fabric.Rect({
      width: widthParam,
      height: heightParam,
      left: leftParam,
      top: topParam,
      angle: angleParam,
      fill: fillParam,
      opacity: opacityParam,
      scaleY: scaleYparam,
      scaleX: scaleXparam
    });

    this.extend(rect, idParam, nombreParam, idCTRCentroparam);

    this.canvas.add(rect);
    this.canvas.renderAll();
    this.setCanvasImage();
    this.selectItemAfterAdded(rect);


    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);
  }

  /**
   *  Settea la imagen de fondo del lienzo, sin parametros
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.setCanvasImage()
   * ```
   */
  setCanvasImage(): void {

  } //

  /**
   *  Settea la imagen de fondo del lienzo, con parametros
   *  Se utiliza para pintar los objetos recuperados de la BD
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.setCanvasImageParam(cnvImg: string)
   * ```
   */
  setCanvasImageParam(cnvImg: string): void {
    const self = this;

    this.canvas.setBackgroundColor(
      new fabric.Pattern({ source: cnvImg, repeat: "repeat" }),
      () => {
        self.props.canvasFill = "";
        self.canvas.renderAll();
      }
    );
    this.props.canvasImage = cnvImg;
    this.canvas.renderAll();
    console.log("CANVASIMG");
    this.canvas.setWidth(0);
    this.canvas.setWidth(1140);


    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);
  }

  //getter y setter estilo canvas
  getActiveStyle(styleName, object): any {
    object = object || this.canvas.getActiveObject();
    if (!object) {
      return "";
    }

    if (object.getSelectionStyles && object.isEditing) {
      return object.getSelectionStyles()[styleName] || "";
    } else {
      return object[styleName] || "";
    }

    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);
  }

  setActiveStyle(
    styleName,
    value: string | number,
    object: fabric.IText
  ): void {
    const underline: string = "underline";
    const overline: string = "overline";
    const lineThrough: string = "line-through";
    object = object || (this.canvas.getActiveObject() as fabric.IText);
    if (!object) {
      return;
    }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};

      style[styleName] = value;

      if (typeof value === "string") {
        if (value.includes(underline)) {
          object.setSelectionStyles({ underline: true });
        } else {
          object.setSelectionStyles({ underline: false });
        }

        if (value.includes(overline)) {
          object.setSelectionStyles({ overline: true });
        } else {
          object.setSelectionStyles({ overline: false });
        }

        if (value.includes(lineThrough)) {
          object.setSelectionStyles({ linethrough: true });
        } else {
          object.setSelectionStyles({ linethrough: false });
        }
      }

      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      if (typeof value === "string") {
        if (value.includes(underline)) {
          object.set("underline", true);
        } else {
          object.set("underline", false);
        }

        if (value.includes(overline)) {
          object.set("overline", true);
        } else {
          object.set("overline", false);
        }

        if (value.includes(lineThrough)) {
          object.set("linethrough", true);
        } else {
          object.set("linethrough", false);
        }
      }

      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();


    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);
  }

  /**
   *  Busca el objeto con el id pasado como parametro en la BD, si no existe, devuelve false,
   * si existe, devuelve true
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.existe(id: string)
   * ```
   */
  existe(id: string): boolean {
    console.log("OBJETO FIND " + id);
    this.lienzoService
      .findLienzo(id)
      .subscribe((data) => (this.objetoEncontrado = data));
    console.log(
      "OBJETO FIND " +
      this.objetoEncontrado.id +
      "DATA " +
      this.objetoEncontrado.id
    );
    if (this.objetoEncontrado.id != 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Si el objeto existe, lo elimina de la BD
   * ```typescript
   * // Se llama desde CanvasFactory, se llama desde removeSelected
   * this.CanvasFactory.deleteCanvasFromDB(id: string)
   * ```
   */
  deleteCanvasFromDB(id: number): void {
    if (this.existe) {
      this.lienzoService
        .deleteLienzo(id)
        .subscribe((data) =>
          console.log(
            "OBJETO CON ID: " + id + "ELIMINADO DE LA BD ----- " + data
          )
        );
    }

    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);

  }

  /**
   * Si el objeto existe, lo actualiza
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.updateCanvasFromDB(Object:ObjProps)
   * ```
   */
  updateCanvasFromDB(Object: ObjProps): void {
    this.lienzoService
      .updateLienzo(Object)
      .subscribe((data) =>
        console.log(
          "OBJETO CON ID: " + Object.id + "ACTUALIZADO DE LA BD ----- " + data
        )
      );

    //Actualizar el canvas despues de cada cambio
    this.comunicadorService.enviarCanvas(this.canvas);
  } // update

  confirmClear(): void {
    if (confirm('Se va a eliminar el lienzo')) {
      this.canvas.clear();
    }
    this.comunicadorService.enviarCanvas(this.canvas)
  }

  cleanSelect() {
    this.canvas.discardActiveObject().renderAll();
    this.comunicadorService.enviarCanvas(this.canvas)

  }

  findByID(id){
    console.log("OBJETO FIND " + id)
    this.lienzoService.findLienzo(id).subscribe(data => this.objeto2 = data);
    console.log("OBJETO FIND " + this.objeto2.id + "DATA " + this.objeto2.id);
    if (this.objeto2.id != 0) {
      return true;
    } else {
      return false;
    }
  } // encontrar por id, comprobar si existe


saveCanvasToBD() {
  console.log("*************************************")
    console.log("*************************************")
    // this.centro.width = this.canvas.getWidth()
    // this.centro.height = this.canvas.getHeight();
    this.centro.aulas = this.arrayProps
    console.log(this.centro.aulas)
  console.log(this.centro)

  // this.lienzoService.updateCentro(this.centro)
  var sizeCanvas = this.arrayProps.length
  console.log('size -- '
  +this.canvas.size())
  let arrayProps = [];

  // this.canvas.clear();
  for (var i = 0; i <= sizeCanvas - 1;
       i++
  ) {
    console.log(this.canvas.toObject())
    var item = this.arrayProps[i];
    console.log(item);
    if (this.findByID(item.id) === true) {//si el canvas existe, actualiza, si se cambia el id, borra y pinta
      this.lienzoService.postLienzo(item).subscribe(data => console.log(data));
      console.log("EXISTE, ACTUALIZANDO")
    } else {
      this.lienzoService.postLienzo(item).subscribe(data => console.log(data));
      console.log("NO EXISTE, CREANDO")

    }
    this.lienzoService.addToCentro(999, item.id).subscribe(data => console.log(data))
    this.comunicadorService.enviarCanvas(this.canvas)
  }

}


  removeSelected() {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();
    const activeId = this.canvas.getActiveObject().toDatalessObject(["id", "nombre", "CNVIMG"]).id;
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
    this.comunicadorService.enviarCanvas(this.canvas)

  }
  sendToBack() {
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
      this.comunicadorService.enviarCanvas(this.canvas)

    }  }
  bringToFront() {
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
      this.comunicadorService.enviarCanvas(this.canvas)

    }  }
  clone() {
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
      this.comunicadorService.enviarCanvas(this.canvas)
    }

  }

}
