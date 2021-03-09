import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { fabric } from "fabric";

import { ObjProps } from "src/app/obj-props";

import { CanvasProps } from "src/app/CanvasProps";
import { CanvasService } from "src/app/canvas.service";
import { EditorLienzoComponent } from "./editor-lienzo/editor-lienzo.component";
import { ComunicadorService } from "./comunicador.service";

export class CanvasFactory implements OnInit {

  public canvas: fabric.Canvas;

  public size: any;

  public props: CanvasProps = {
    // obj canvas
    canvasFill: "#ffffff",
    canvasImage: "",
    id: 1,
    nombre: null,
    opacity: null,
    fill: null,
  };

  seleccionado: String = "object:selected";
  movimiento: String = "object:moving";

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
    canvasImage: "",
    cnvIMG: "",
  };

  private objetoEncontrado: ObjProps = {
    //objFind
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
    canvasImage: "",
    cnvIMG: "",
  };

  constructor(private lienzoService: CanvasService, private comunicadorService: ComunicadorService) {
    this.size = {
      width: 1140,
      height: 800,
    };
    this.comunicadorService.enviarCanvasObservable.subscribe(data => {console.warn("SAPEEEEESIII" + data); this.canvas = data});
  }
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
  }

  /**
   * Extiende el objeto del canvas con los parametros extra (ID, name...)
   *
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.extend(obj:any, id:number, nombre: string, cnvIMG:string)
   * ```
   */
  extend(obj: any, id: number, nombre: string, cnvIMG: string): void {
    obj.toObject = (function (toObject): any {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id: id,
          nombre: nombre,
          cnvIMG: cnvIMG,
        });
      };
    })(obj.toObject);
    obj.id = id;
    obj.nombre = nombre;
    cnvIMG = this.props.canvasImage;
    obj.cnvIMG = cnvIMG;
  }

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
    let canvImageParam: string = Objeto.canvasImage;

    let rect = new fabric.Rect({
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

  /**
   *  Settea la imagen de fondo del lienzo, sin parametros
   * ```typescript
   * // Se llama desde CanvasFactory
   * this.CanvasFactory.setCanvasImage()
   * ```
   */
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
  } // update
}
